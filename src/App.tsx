import './App.css'

const welcome = {
  greeting: 'Hey',
  title: 'React', 
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

function App() {

  return (
    <div>
      <h1>Hello {welcome.greeting} {welcome.title}</h1>

      <ul>
        {items.map(function(item) {
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
          })
        }
      </ul>

      <label htmlFor="search">Search</label>
      <input id="search" type="text" />
    </div>
  )

 
}

export default App
