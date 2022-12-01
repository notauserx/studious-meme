import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchInput from "./SearchInput";

const [searchTerm, onSearchTermChange] = ["react", vi.fn()];

describe("SearchInput", () => {
  it("renders the input with term", () => {
    render(<SearchInput term={searchTerm} onTermChange={vi.fn()} />);

    expect(screen.getByDisplayValue(searchTerm)).toBeInTheDocument();
  });
  it("calls the handled on input change", () => {
    render(<SearchInput term={searchTerm} onTermChange={onSearchTermChange} />);

    fireEvent.change(screen.getByDisplayValue(searchTerm), {
      target: { value: 'another' }
    });

    expect(onSearchTermChange).toBeCalled();
  });
});
