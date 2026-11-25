export { cn } from "cn";

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  const firstName = words[0];
  if (!firstName) {
    return "?";
  }

  const lastName = words[words.length - 1];

  if (words.length === 1 || !lastName) {
    const initials = Array.from(firstName).slice(0, 2).join("").toUpperCase();
    return initials;
  }

  const initials = (
    Array.from(firstName).slice(0, 1).join("") +
    Array.from(lastName).slice(0, 1).join("")
  ).toUpperCase();

  return initials;
}
