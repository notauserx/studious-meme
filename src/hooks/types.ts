import { Story } from "../components/StoriesContainer/types";

export interface FetchStoriesInitAction {
  type: 'FETCH_STORIES_INIT'
}

export interface FetchStoriesSuccessAction {
  type: 'FETCH_STORIES_SUCCESS',
  payload: Story[]
}

export interface FetchStoriesFailureAction {
  type: 'FETCH_STORIES_FAILURE'
}

export interface RemoveStoryAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

export type StoriesState = {
  data: Story[],
  isLoading: boolean,
  isError: boolean,
}

export type StoriesAction =
  | FetchStoriesInitAction
  | FetchStoriesSuccessAction
  | FetchStoriesFailureAction
  | RemoveStoryAction

export * as storiesReducerTypes from './types';