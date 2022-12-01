import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import StoryListItem from "./StoryListItem";
import { Story } from "./types";

const storyOne: Story = {
  title: "a story title",
  url: "aurl",
  author: "aa",
  num_comments: 3,
  points: 3,
  objectID: 4,
};

const onRemoveItem = vi.fn();

describe("Item", () => {
  it("renders the story title", () => {
    render(<StoryListItem item={storyOne} onRemoveItem={onRemoveItem} />);

    expect(screen.getByText(/a story title/)).toBeInTheDocument();
  });

  it("renders the link to the story", () => {
    render(<StoryListItem item={storyOne} onRemoveItem={onRemoveItem} />);

    expect(screen.getByText(/a story title/)).toHaveAttribute("href", "aurl");
  });

  it("renders a dismiss icon", () => {
    render(<StoryListItem item={storyOne} onRemoveItem={onRemoveItem} />);

    expect(screen.getByTitle("dismiss-icon")).toBeInTheDocument();
  });

  it("calls the onRemoveItem when dismiss-icon is clicked", async () => {
    render(<StoryListItem item={storyOne} onRemoveItem={onRemoveItem} />);

    expect(screen.getByText(/a story title/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTitle("dismiss-icon"));

    expect(onRemoveItem).toBeCalled();
  });
});
