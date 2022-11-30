import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import useLocalStorageState from "../../hooks/useStorageState";
import { initialStories, Story } from "./types";
import useStoriesReducer from "../../hooks/useStoriesReducer";
import StoriesList from "./StoriesList";
import SearchForm from "../SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const StoriesContainer = () => {
  const [searchTerm, setSearchTerm] = useLocalStorageState(
    "searchTerm",
    "react"
  );

  const [searchTag, setSearchTag] = useState('all')

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTagChange = (event:ChangeEvent<HTMLSelectElement>) => {
    setSearchTag(event.target.value);
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const [stories, dispatchStories] = useReducer(useStoriesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(
    async (useApiCall: boolean) => {
      if (!searchTerm) return;

      dispatchStories({ type: "FETCH_STORIES_INIT" });

      try {
        dispatchStories({
          type: "FETCH_STORIES_SUCCESS",
          payload: useApiCall ? (await axios(url)).data.hits : initialStories,
        });
      } catch {
        dispatchStories({ type: "FETCH_STORIES_FAILURE" });
      }
    },
    [url]
  );

  useEffect(() => {
    // pass true to call the api, false to use dummy data.
    handleFetchStories(true);
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <>
      <div className="w-1/4">
        
        <SearchForm 
          onSearchSubmit={handleSearchSubmit}
          term={searchTerm} onTermChange={handleSearchInput} 
          tag={searchTag} onTagChange={handleSearchTagChange}
        />
      </div>
      <div className="w-3/4 pl-6">
        {stories.isError && <p>Something went wrong ...</p>}

        {stories.isLoading ? (
          <>
            <p>Loading ...</p>
          </>
        ) : (
          <StoriesList
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )}
      </div>
    </>
  );
};



export default StoriesContainer;
