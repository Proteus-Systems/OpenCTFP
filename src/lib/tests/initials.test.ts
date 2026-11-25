import { getInitials } from "@/lib/utils";
import { describe, expect, test } from "vitest";

describe("Test getInitials", () => {
  test.each([
    ["Alex Smith", "AS"],
    ["Alex", "AL"],
    ["A", "A"],
    ["    Alex       Smith   ", "AS"],
    ["Mary Jane Watson", "MW"],
    ["", "?"],
    ["  ", "?"],
    ["🎄 Alex", "🎄A"],
    ["Sam Sam", "SS"],
  ])("getInitials(%s) -> %s", (input, expected) => {
    expect(getInitials(input)).toBe(expected);
  });
});
