import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Hello({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

describe("RTL sanity check", () => {
  it("コンポーネントを render して assertion できる", () => {
    render(<Hello name="bingo" />);
    expect(screen.getByRole("heading")).toHaveTextContent("Hello, bingo!");
  });
});
