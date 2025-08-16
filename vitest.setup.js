import { afterEach, expect } from "vitest";

try {
  const matchers = await import("@testing-library/jest-dom/matchers");
  expect.extend(matchers.default);
  const { cleanup } = await import("@testing-library/react");
  afterEach(cleanup);
} catch {
  // testing-library not installed; skip additional setup
}
