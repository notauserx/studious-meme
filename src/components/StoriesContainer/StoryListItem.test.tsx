import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StoryListItem from "./StoryListItem";
import { Story } from "./types";

const storyOne: Story = {
  title: "a",
  url: "aurl",
  author: "aa",
  num_comments: 3,
  points: 3,
  objectID: 4,
};

const onRemoveItem = (story: Story) => void {

}

describe("Item", () => {
  it("renders all properties", () => {
    render(<StoryListItem item={storyOne} onRemoveItem={onRemoveItem} />);
    //expect(screen.getByText("aa")).toBeInTheDocument();
    expect(screen.getByText("a")).toHaveAttribute(
      "href",
      "aurl"
    );
  });
});
