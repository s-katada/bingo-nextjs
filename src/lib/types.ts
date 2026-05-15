/**
 * BINGO ゲームのドメインモデル。
 *
 * - カードは 5x5 のセルから成る (中央はフリーマス)
 * - 各列は B(1-15), I(16-30), N(31-45), G(46-60), O(61-75) の範囲の数字を 5 個ずつ持つ
 */

export const COLUMN_LETTERS = ["B", "I", "N", "G", "O"] as const;
export type ColumnLetter = (typeof COLUMN_LETTERS)[number];

/**
 * 各列が含む数字の範囲 (半開区間 `[from, to)`)。
 * 例: B 列は 1..15 なので `[1, 16]`。
 */
export const COLUMN_RANGES = {
  B: [1, 16],
  I: [16, 31],
  N: [31, 46],
  G: [46, 61],
  O: [61, 76],
} as const satisfies Record<ColumnLetter, readonly [number, number]>;

export const CARD_SIZE = 5;
export const TOTAL_NUMBERS = 75;
export const CENTER_POSITION = { row: 2, col: 2 } as const;

/**
 * セル。フリーマス、もしくは数字とマーク状態を持つマス。
 */
export type Cell =
  | { kind: "free" }
  | { kind: "number"; value: number; marked: boolean };

/** カードの 1 行 (5 セル固定)。 */
export type CardRow = readonly [Cell, Cell, Cell, Cell, Cell];

/** ビンゴカード (5 行 x 5 列、中央はフリー)。 */
export type Card = {
  rows: readonly [CardRow, CardRow, CardRow, CardRow, CardRow];
};

export type PlayerId = string;

export type Player = {
  id: PlayerId;
  name: string;
  card: Card;
};

export type RoomId = string;

/** ゲームルーム。ホストが作成し、複数プレイヤーが参加する。 */
export type Room = {
  id: RoomId;
  hostName: string;
  players: readonly Player[];
  /** ホストが引いた数字を順に並べた履歴。 */
  drawn: readonly number[];
  createdAt: Date;
};

/** 数字が属する列を返す。範囲外 (1-75 以外) なら null。 */
export function columnOf(value: number): ColumnLetter | null {
  for (const letter of COLUMN_LETTERS) {
    const [from, to] = COLUMN_RANGES[letter];
    if (value >= from && value < to) return letter;
  }
  return null;
}

export function isFreeCell(cell: Cell): cell is { kind: "free" } {
  return cell.kind === "free";
}

export function isNumberCell(
  cell: Cell,
): cell is { kind: "number"; value: number; marked: boolean } {
  return cell.kind === "number";
}
