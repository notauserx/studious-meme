import * as React from 'react';
import './App.css'
import axios from 'axios';

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 4,
    objectID: 1,
  },
  {
    title: 'mui',
    url: 'https://mui.com/',
    author: 'Tom Crockett',
    num_comments: 4,
    points: 3,
    objectID: 2,
  }
];

interface Story {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
}

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, searchTerm)
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
}

interface FetchStoriesInitAction {
  type: 'FETCH_STORIES_INIT'
}

interface FetchStoriesSuccessAction {
  type: 'FETCH_STORIES_SUCCESS',
  payload: Story[]
}

interface FetchStoriesFailureAction {
  type: 'FETCH_STORIES_FAILURE'
}

interface RemoveStoryAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesState = {
  data: Story[],
  isLoading: boolean,
  isError: boolean,
}

type StoriesAction =
  | FetchStoriesInitAction
  | FetchStoriesSuccessAction
  | FetchStoriesFailureAction
  | RemoveStoryAction

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState('searchTerm', '');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async (useApiCall: boolean) => {
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

  React.useEffect(() => {
    // pass true to call the api, false to use dummy data.
    handleFetchStories(false)
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  }



  return (
    
    <div className="container mx-auto py-12 px-6 min-h-screen">

      <Banner />
      <hr />
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <>
        <p>Loading ...</p>
        </>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />

      )
      }

    </div>
    
  );
}

const Banner = () => (
  <div className="text-center m-2">
    <h1>Welcome to hacker stories</h1>
    <h3>Stories we love and hate</h3>
  </div>
)

const SearchForm = ({
  searchTerm, onSearchInput, onSearchSubmit
}: {
  searchTerm: string,
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) => (
  <form className='text-center' onSubmit={onSearchSubmit} >
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Submit
    </button>
  </form>
)

const InputWithLabel = ({
  id, label, value, type = 'text', onInputChange, isFocused, children }:
  {
    id: string,
    label: string,
    value: string,
    type?: string,
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    isFocused: boolean,
    children: React.ReactNode
  }) => {
  // A. create a ref with react's useRef hook
  const inputRef = React.useRef<HTMLInputElement>(null);

  // C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B. pass input ref to JSX-reserved ref attr*/}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  );
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

export default App
