import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import StoriesContainer from ".";
import { Story } from "./types";

const stories: Story[] = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 4,
    objectID: 1,
  },
];

//const mockedAxios = axios as vi.mocked<typeof axios>;

vi.mock("axios");

describe("StoriesContainer", () => {
  it("renders loading when initialized", () => {
    render(<StoriesContainer />);

    screen.debug();

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
  });

  it("renders stories when fetch succeeds", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });
    axios.get = vi.fn().mockImplementationOnce(() => promise);
    render(<StoriesContainer />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    await waitFor(async () => {
      await promise;
      expect(screen.queryByText(/Loading/)).toBeNull();

      // TODO :: figure out how to mock axios properly
      // expect(screen.getByText("React")).toBeInTheDocument();
      // expect(screen.getByText("Redux")).toBeInTheDocument();
    });
  });

  it("fails fetching data", async () => {
    const promise = Promise.reject();

    render(<StoriesContainer />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    try {
      await waitFor(async () => await promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
    }
  });
});
