import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.url("must be a valid URL string."),
  BASE_URL: z.url("must be a valid URL string."),
  BASE_DOMAIN: z
    .string("must be a valid string.")
    .min(1, "must be a valid string."),
  ROUTING_MODE: z
    .enum(["subdomain", "port"], "must be subdomain or port.")
    .default("subdomain"),
  PORT_RANGE: z.string().optional(),
  AUTH_SECRET: z
    .hex("must be a valid 32 byte hex value")
    .min(64, "must be a valid 32 byte hex value"),
  INSTANCE_TOKEN_SECRET: z
    .hex("must be a valid 32 byte hex value")
    .min(64, "must be a valid 32 byte hex value"),
  MAX_INSTANCES: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(80),
  LAUNCH_CONCURRENCY: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(5),
  INSTANCE_MAX_CPU: z.coerce
    .number("must be a valid positive number.")
    .positive("must be a valid positive number.")
    .default(0.5),
  INSTANCE_MAX_MEMORY_MB: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(256),
  INSTANCE_MAX_PIDS: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(256),
  INSTANCE_IDLE_MINUTES: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(30),
  INSTANCE_GRACE_MINUTES: z.coerce
    .number("must be a valid positive integer.")
    .int("must be a valid positive integer.")
    .positive("must be a valid positive integer.")
    .default(10),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    "Invalid environment configuration:\n" + z.prettifyError(result.error),
  );
}

export const config = result.data;
