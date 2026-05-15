import { describe, expect, it } from "vitest";
import { range } from "@/lib/range";

describe("range", () => {
  it("start から end-1 までの整数配列を返す", () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it("start === end の場合は空配列", () => {
    expect(range(3, 3)).toEqual([]);
  });

  it("start > end の場合は空配列 (逆順は生成しない)", () => {
    expect(range(5, 1)).toEqual([]);
  });
});
