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
interface ListProps {
  list: Story[];
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
  return (
    <div>

      <Banner />
      <hr />
      <Search />
      <hr />
      <List list={stories} />

    </div>
  );
}

const Banner = () => (
  <div>
    <h1>Welcome to hacker stories</h1>
    <h3>Stories we love and hate</h3>
  </div>
)

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search </label>
      <input id="search" type="text" onChange={handleChange} />

      {searchTerm.length > 0 &&
      <p>
        Searching for <strong>{searchTerm}</strong>
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
