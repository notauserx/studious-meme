import './App.css'

const welcome = {
  greeting: 'Hey',
  title: 'Stranger',
  subtitle: 'Welcome welcome',
}

const items = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_commnets: 3,
    point: 4,
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
]

const App = () => (
  <div>

    <Banner />
    <hr />
    <Search />
    <hr />
    <List />

  </div>
);

const Banner = () => (
  <div>
    <h1>{welcome.greeting} {welcome.title}</h1>
    <h3>{welcome.subtitle}</h3>
  </div>
)

const Search = () => (
  <div>
    <label htmlFor="search">Search </label>
    <input id="search" type="text" />
  </div>
);


const List = () => (
  <ul>
    {items.map(item => {
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
