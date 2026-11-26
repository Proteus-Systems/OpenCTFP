import { ac, organiser, owner, player } from "@/lib/permissions";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: { owner, organiser, player },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
