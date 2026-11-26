import "server-only";

import { db } from "@/lib/db";

let setupDone = false;

export async function needsSetup(): Promise<boolean> {
  if (setupDone) {
    return false;
  }

  const user = await db.user.findFirst({ select: { id: true } });
  if (user) {
    setupDone = true;
    return false;
  }
  return true;
}

export function markSetupDone() {
  setupDone = true;
}
