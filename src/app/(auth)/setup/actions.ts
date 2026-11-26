"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { markSetupDone } from "@/lib/setup";
import { headers } from "next/headers";
import z from "zod";

const SETUP_LOCK_ID = 10;

const ownerSchema = z.object({
  name: z.string("Invalid name").trim().min(1, "Invalid name"),
  email: z
    .string("Invalid email")
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email")),
  password: z
    .string("Invalid password")
    .min(8, "Password too short")
    .max(128, "Password too long"),
});

export async function createOwner(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string; loggedIn: boolean }> {
  const checkResult = ownerSchema.safeParse(input);

  if (!checkResult.success) {
    return {
      success: false,
      message: checkResult.error.issues[0]?.message ?? "Invalid input.",
      loggedIn: false,
    };
  }

  const { name, email, password } = checkResult.data;

  const ctx = await auth.$context;
  const passwordHash = await ctx.password.hash(password);

  const success = await db.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${SETUP_LOCK_ID}::BIGINT)`;

    const user = await tx.user.findFirst({ select: { id: true } });
    if (user) {
      return false;
    }
    const userId = crypto.randomUUID();
    const now = new Date();
    await tx.user.create({
      data: {
        id: userId,
        name,
        email,
        emailVerified: false,
        role: "owner",
        createdAt: now,
        updatedAt: now,
        accounts: {
          create: {
            id: crypto.randomUUID(),
            providerId: "credential",
            accountId: userId,
            password: passwordHash,
            createdAt: now,
            updatedAt: now,
          },
        },
      },
    });

    return true;
  });

  if (!success) {
    return {
      success: false,
      message: "Setup has already been completed.",
      loggedIn: false,
    };
  }

  markSetupDone();
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
  } catch {
    return {
      success: true,
      message: "Owner created. Please log in.",
      loggedIn: false,
    };
  }

  return {
    success: true,
    message: "Account created successfully.",
    loggedIn: true,
  };
}
