FROM node:22-alpine AS base
RUN npm install -g corepack@latest && corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm exec prisma generate

ENV NEXT_TELEMETRY_DISABLED=1

RUN DATABASE_URL=postgresql://build:build@localhost:5432/build \
    BASE_URL=http://localhost:3000 \
    BASE_DOMAIN=localhost \
    AUTH_SECRET=0000000000000000000000000000000000000000000000000000000000000000 \
    INSTANCE_TOKEN_SECRET=0000000000000000000000000000000000000000000000000000000000000000 \
    pnpm build

FROM base AS migrator
WORKDIR /migrate
RUN npm init -y && npm install prisma@7.10.1 dotenv

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

COPY --from=migrator /migrate/node_modules ./migrate/node_modules

COPY prisma ./migrate/prisma
COPY prisma.config.ts ./migrate/

COPY --chmod=755 docker-entrypoint.sh ./

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=30s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["./docker-entrypoint.sh"]