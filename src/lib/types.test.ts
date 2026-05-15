import { describe, expect, it } from "vitest";
import {
  CARD_SIZE,
  CENTER_POSITION,
  type Cell,
  COLUMN_LETTERS,
  COLUMN_RANGES,
  columnOf,
  isFreeCell,
  isNumberCell,
  TOTAL_NUMBERS,
} from "@/lib/types";

describe("定数", () => {
  it("COLUMN_LETTERS は B/I/N/G/O の順", () => {
    expect(COLUMN_LETTERS).toEqual(["B", "I", "N", "G", "O"]);
  });

  it("カードサイズは 5", () => {
    expect(CARD_SIZE).toBe(5);
  });

  it("総数字数は 75", () => {
    expect(TOTAL_NUMBERS).toBe(75);
  });

  it("中央セル位置は (2, 2)", () => {
    expect(CENTER_POSITION).toEqual({ row: 2, col: 2 });
  });
});

describe("COLUMN_RANGES", () => {
  it("B 列は [1, 16) = 1..15", () => {
    expect(COLUMN_RANGES.B).toEqual([1, 16]);
  });

  it("I 列は [16, 31)", () => {
    expect(COLUMN_RANGES.I).toEqual([16, 31]);
  });

  it("N 列は [31, 46)", () => {
    expect(COLUMN_RANGES.N).toEqual([31, 46]);
  });

  it("G 列は [46, 61)", () => {
    expect(COLUMN_RANGES.G).toEqual([46, 61]);
  });

  it("O 列は [61, 76)", () => {
    expect(COLUMN_RANGES.O).toEqual([61, 76]);
  });

  it("どの列も 15 個の数字を含む", () => {
    for (const letter of COLUMN_LETTERS) {
      const [from, to] = COLUMN_RANGES[letter];
      expect(to - from).toBe(15);
    }
  });
});

describe("columnOf", () => {
  it.each([
    [1, "B"],
    [15, "B"],
    [16, "I"],
    [30, "I"],
    [31, "N"],
    [45, "N"],
    [46, "G"],
    [60, "G"],
    [61, "O"],
    [75, "O"],
  ] as const)("%d は %s 列", (value, expected) => {
    expect(columnOf(value)).toBe(expected);
  });

  it("範囲外 (0, 76, 負数) は null", () => {
    expect(columnOf(0)).toBeNull();
    expect(columnOf(76)).toBeNull();
    expect(columnOf(-1)).toBeNull();
  });
});

describe("Cell 型ガード", () => {
  it("isFreeCell は free セルに true を返す", () => {
    const cell: Cell = { kind: "free" };
    expect(isFreeCell(cell)).toBe(true);
    expect(isNumberCell(cell)).toBe(false);
  });

  it("isNumberCell は number セルに true を返す", () => {
    const cell: Cell = { kind: "number", value: 12, marked: false };
    expect(isNumberCell(cell)).toBe(true);
    expect(isFreeCell(cell)).toBe(false);
  });

  it("型ガード後は型を絞り込める (コンパイル時検証)", () => {
    const cell: Cell = { kind: "number", value: 42, marked: true };
    if (isNumberCell(cell)) {
      expect(cell.value).toBe(42);
      expect(cell.marked).toBe(true);
    }
  });
});
