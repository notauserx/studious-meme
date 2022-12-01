import { Story } from "../components/StoriesContainer/types";
import { StoriesState, StoriesAction } from "./types";



const useStoriesReducer = (state: StoriesState, action: StoriesAction) => {
  switch (action.type) {
    case 'FETCH_STORIES_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }

    case 'FETCH_STORIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }

    case 'FETCH_STORIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter((story: Story) => action.payload.objectID !== story.objectID),
      }
    default:
      throw new Error();
  }
}

export default useStoriesReducer;