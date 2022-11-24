import * as React from 'react';
import './App.css'

interface Story {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectId: number;
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

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectId: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 4,
    objectId: 1,
  },
  {
    title: 'mui',
    url: 'https://mui.com/',
    author: 'Tom Crockett',
    num_comments: 4,
    points: 3,
    objectId: 2,
  }
];

const App = () => {

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter(s =>
      item.objectId !== s.objectId);

    setStories(newStories);
  }

  const [searchTerm, setSearchTerm] = useStorageState('searchTerm', '');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>

      <Banner />
      <hr />
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused={true}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={filteredStories} onRemoveItem={handleRemoveStory} />

    </div>
  );
}

const Banner = () => (
  <div>
    <h1>Welcome to hacker stories</h1>
    <h3>Stories we love and hate</h3>
  </div>
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
  const inputRef = React.useRef<HTMLElement>(null);

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

      {value.length > 0 &&
        <p>
          Searching for <strong>{value}</strong>
        </p>}
    </>
  );
}

const List = (
  { list, onRemoveItem }: { list: Story[], onRemoveItem: (item: Story) => void }) => (
  <ul>
    {list.map(item => (
      <ListItem key={item.objectId} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const ListItem = (
  { item, onRemoveItem }: { item: Story, onRemoveItem: (item: Story) => void }) => (
  <li key={item.objectId}>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span> {item.author}</span>
    <span> {item.num_comments}</span>
    <span> {item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
    </span>
  </li>
)

export default App
