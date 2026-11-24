import "server-only";

import { config } from "@/lib/config";
import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "OpenCTFP",
  database: prismaAdapter(db, { provider: "postgresql" }),
  secret: config.AUTH_SECRET,
  baseURL: config.BASE_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],
});
