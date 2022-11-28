import axios from "axios";
import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useState } from "react";
import useLocalStorageState from "../../hooks/useStorageState";
import SearchForm from "./searchForm";
import { storiesReducer, initialStories, Story } from "./types";



const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const StoriesContainer = () => {

  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', 'react');

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${searchTerm}`
  );

 const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = useCallback(async (useApiCall: boolean) => {
    if (!searchTerm) return;

    dispatchStories({ type: 'FETCH_STORIES_INIT' });

    try {
      dispatchStories({
        type: 'FETCH_STORIES_SUCCESS',
        payload: useApiCall
          ? (await axios(url)).data.hits
          : initialStories
      });
    } catch {
      dispatchStories({ type: 'FETCH_STORIES_FAILURE' });
    }

  }, [url]);

  useEffect(() => {
    // pass true to call the api, false to use dummy data.
    handleFetchStories(true)
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  }

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
              <List list={stories.data} onRemoveItem={handleRemoveStory} />
            )}
          </div>
          </>
  )
}

const List = (
  { list, onRemoveItem }: { list: Story[], onRemoveItem: (item: Story) => void }) => (
  <div className='list-container'>
    <ul>
      {list.map(item => (
        <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  </div>
);

const ListItem = (
  { item, onRemoveItem }: { item: Story, onRemoveItem: (item: Story) => void }) => (
  <li
   className='item' 
   key={item.objectID}>
    <span style={{ width: '40%'}}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%'}}> by {item.author}</span>
    <span style={{ width: '10%'}}> {item.num_comments} comments</span>
    <span style={{ width: '10%'}}> {item.points} points</span>
    <span style={{ width: '10%'}}>
      <button 
        type="button" 
        className='button button-small'
        onClick={() => onRemoveItem(item)}>
          Dismiss</button>
    </span>
  </li>
)

export default StoriesContainer;