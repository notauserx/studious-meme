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

const App = () => {

  const stories = [
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

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const filteredStoried = stories.filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>

      <Banner />
      <hr />
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={filteredStoried} />

    </div>
  );
}

const Banner = () => (
  <div>
    <h1>Welcome to hacker stories</h1>
    <h3>Stories we love and hate</h3>
  </div>
)

const Search = (props: { searchTerm:string, onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {

  return (
    <div>
      <label htmlFor="search">Search </label>
      <input id="search" 
              type="text" 
              value={props.searchTerm} 
              onChange={props.onSearch} />

      {props.searchTerm.length > 0 &&
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
      }
    </div>
  );
}

const List = (props: {list: Story[]}) => (
  <ul>
    {props.list.map(item => {
      return (
        <li key={item.objectId}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span> {item.author}</span>
          <span> {item.num_comments}</span>
          <span> {item.points}</span>
        </li>
      );
    })}
  </ul>
);

export default App
