import {FaSearch } from "react-icons/fa"

const searchForm = () => {
  
}

const Search = () => (
  <div className='search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);

export default Search