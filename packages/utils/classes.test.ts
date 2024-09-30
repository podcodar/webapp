import { expect, test } from "bun:test";
import { classes } from "./classes";

test("test_with_empty_arguments", () => {
  const input: string[] = [];

  const expected = "";

  expect(classes(...input)).toBe(expected);
});

test("test_with_valid_argument", () => {
  const input: string[] = ["bg-red-500"];

  const expected = "bg-red-500";

  expect(classes(...input)).toBe(expected);
});

test("test_with_multiple_valid_arguments", () => {
  const input: string[] = ["bg-red-500", "text-white"];

  const expected = "bg-red-500 text-white";

  expect(classes(...input)).toBe(expected);
});

test("test_with_dynamic_argument", () => {
  const darkMode = Math.random() > 0.5 ? "dark" : "light";
  const input: string[] = ["bg-red-500", darkMode];

  const expected = `bg-red-500 ${darkMode}`;

  expect(classes(...input)).toBe(expected);
});

test("test_with_non_string_argument", () => {
  const nonStringArgument = true;
  const input = ["bg-red-500", nonStringArgument] as string[];

  const expected = "bg-red-500";

  expect(classes(...(input as string[]))).toBe(expected);
});

test("test_with_null_and_undefined_arguments", () => {
  const input = ["bg-red-500", null, undefined] as string[];

  const expected = "bg-red-500";

  expect(classes(...(input as string[]))).toBe(expected);
});

test("test_with_empty_string_argument", () => {
  const input: string[] = ["bg-red-500", ""];

  const expected = "bg-red-500";

  expect(classes(...input)).toBe(expected);
});

test("test_with_mixed_arguments", () => {
  const input = ["bg-red-500", "", null, undefined, "text-white", 42] as string[];

  const expected = "bg-red-500 text-white";

  expect(classes(...(input as string[]))).toBe(expected);
});

test("test_with_only_invalid_arguments", () => {
  const input = [null, undefined, true, false, 42] as string[];

  const expected = "";

  expect(classes(...(input as string[]))).toBe(expected);
});

test("test_with_duplicate_arguments", () => {
  const input: string[] = ["bg-red-500", "bg-red-500"];

  const expected = "bg-red-500";

  expect(classes(...input)).toBe(expected);
});
