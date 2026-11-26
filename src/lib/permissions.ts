import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = { ...defaultStatements } as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
  ...adminAc.statements,
});

// TODO: Permissions added in #13

export const organiser = ac.newRole({});

export const player = ac.newRole({});
