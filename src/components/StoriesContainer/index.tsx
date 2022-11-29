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
import SearchForm from "./searchForm";
import { storiesReducer, initialStories, Story } from "./types";
import { FaExternalLinkAlt } from "react-icons/fa";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const StoriesContainer = () => {
  const [searchTerm, setSearchTerm] = useLocalStorageState(
    "searchTerm",
    "react"
  );

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const [stories, dispatchStories] = useReducer(storiesReducer, {
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
          searchTerm={searchTerm}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>
      <div className="w-3/4 pl-6">
        {stories.isError && <p>Something went wrong ...</p>}

        {stories.isLoading ? (
          <>
            <p>Loading ...</p>
          </>
        ) : (
          <StudiousMemesContainer
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )}
      </div>
    </>
  );
};

const StudiousMemesContainer = ({
  list,
  onRemoveItem,
}: {
  list: Story[];
  onRemoveItem: (item: Story) => void;
}) => (
  <>
    <div className="main flex flex-col m-5">
      <div className="header">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stories from the Hacker News api
        </div>
      </div>

      {list.map((item) => (
        <StudiousMeme
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  </>
);

const StudiousMeme = ({
  item,
  onRemoveItem,
}: {
  item: Story;
  onRemoveItem: (item: Story) => void;
}) => (
  <>
    <div className="each flex hover:shadow-lg select-none p-10 rounded-md border-gray-300 border mb-3 hover:border-gray-500">
      <div className="left">
        <div className="header text-blue-700 dark:text-blue-500 font-semibold text-2xl">
          {item.title}
        </div>
        <div className="desc text-gray-600 dark:text-gray-100">
          {item.author}: {item.num_comments} comments : {item.points} points
        </div>
      </div>
      <div className="right m-auto mr-0">
        <a href={item.url} target="_blank">
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  </>
);

export default StoriesContainer;
