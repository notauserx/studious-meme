import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchFormOld = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
  <div className="">
    <Search
      searchTerm={searchTerm}
      onSearchInput={onSearchInput}
      onSearchSubmit={onSearchSubmit}
    />
  </div>
);

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
  <div >
    <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-xl">
      <div className="max-w-md mx-auto space-y-6">
        <form onSubmit={onSearchSubmit}>
          <h2 className="text-2xl font-bold ">Search</h2>
          <p className="my-4 opacity-70">
            Looking for anything specific
          </p>
          <hr className="my-6" />

          <label className="uppercase text-sm font-bold opacity-70">
            Query
          </label>
          <input
            type="text"
            className="p-3 mt-2 mb-4 w-full bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
            onChange={onSearchInput}
            value={searchTerm}
          />

          <TagSelect tag="" />

          <button
            type="submit"
            className="py-3 px-6 my-2 bg-emerald-500 text-white font-medium rounded hover:bg-indigo-500 cursor-pointer ease-in-out duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
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
    <>
      <label className="uppercase text-sm font-bold opacity-70">Tags</label>
      <select
        className="w-full p-3 mt-2 mb-4 w-full bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        onChange={(event) => changeTag(event.target.value)}
        value={searchTag}
      >
        <option value="">All</option>
        <option value="story">Story</option>
        <option value="poll">Pnll</option>
        <option value="comments">Comments</option>
      </select>
      <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
        Tags
      </label>
    </>
  );
};

export default SearchForm;
