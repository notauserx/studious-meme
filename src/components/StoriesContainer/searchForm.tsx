import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({
searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
    <div className="">
      <Search searchTerm={searchTerm} onSearchInput={onSearchInput} onSearchSubmit={onSearchSubmit} />
      
    </div>
  );



const Search = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
  <form className="w-full" onSubmit={onSearchSubmit}>
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
        Query
      </label>
      <div className="flex">
        <input
        className="appearance-none bg-transparent text-gray-700 dark:text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={onSearchInput}
      />
      <FaSearch size="18" />
      </div>
    </div>

    <TagSelect tag="" />    

<div className="w-full px-3 mb-6 md:mb-0">
    <button
      className="flex-shrink-0 bg-teal-500 hover:bg-teal-800 text-sm text-white py-2 px-2 rounded mt-4"
      type="submit"
    >
      Search
    </button>
    </div>
  </form>
);

type tagSelectProps = {
  tag: string;
};

const TagSelect: FC<tagSelectProps> = ({ tag }) => {
  const [searchTag, setSearchTag] = useState(tag);

  const changeTag = (newTag: string): void => {
    setSearchTag(newTag);
  };

  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
        Tags
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-gray-200 dark:bg-gray-700 border border-gray-200 text-gray-700 dark:text-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(event) => changeTag(event.target.value)}
          value={searchTag}
        >
          <option value="">None</option>
          <option value="story">Story</option>
          <option value="poll">Poll</option>
          <option value="comments">Comments</option>
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
