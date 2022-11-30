import { ChangeEvent } from "react";

const SearchInput = ({
  term,
  onTermChange,
}: {
  term: string;
  onTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <label className="uppercase text-sm font-bold opacity-70">Query</label>
    <input
      id="search-query"
      type="text"
      className="p-3 mt-2 mb-4 w-full bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
      onChange={onTermChange}
      value={term}
    />
  </>
);

export default SearchInput;