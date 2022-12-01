import { describe, it, expect } from "vitest";
import { Story } from "../components/StoriesContainer/types";
import { StoriesAction, StoriesState } from "./types";
import useStoriesReducer from "./useStoriesReducer";

const storyOne: Story = {
  title: "a",
  url: "",
  author: "aa",
  num_comments: 3,
  points: 3,
  objectID: 4,
};

const storyTwo: Story = {
  title: "ab",
  url: "",
  author: "aab",
  num_comments: 3,
  points: 3,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  
  it("doesn't change state when fetching is initialized", () => {
    const action: StoriesAction = {
      type: "FETCH_STORIES_INIT"
    };

    const state: StoriesState = {
      data: [],
      isLoading: true,
      isError: false
    };

    const newState = useStoriesReducer(state, action);

    expect(newState).toStrictEqual(state);
  })

  it("sets the state data when fetch is successful", () => {
    const action: StoriesAction = {
      type:"FETCH_STORIES_SUCCESS",
      payload: stories
    }

    const state: StoriesState = {
      data: [],
      isLoading: true,
      isError: false
    }
  
    const newState = useStoriesReducer(state, action);

    expect(newState.data).toStrictEqual(stories);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
  })

  it("sets isError to true when Fetch fails", () => {
    const action: StoriesAction = {
      type:"FETCH_STORIES_FAILURE"
    }

    const state: StoriesState = {
      data: [],
      isLoading: true,
      isError: false
    }
  
    const newState = useStoriesReducer(state, action);

    expect(newState.data).toStrictEqual([]);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
  });

  it("removes a story from all stories", () => {
    // arrange
    const action: StoriesAction = {
      type: "REMOVE_STORY",
      payload: storyOne,
    };
    const state: StoriesState = {
      data: stories,
      isLoading: false,
      isError: false,
    };
    
    // act
    const newState = useStoriesReducer(state, action);

    // assert
    const expectedState: StoriesState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});
