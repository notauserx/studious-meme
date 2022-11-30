import { ChangeEvent, FC } from "react";

type searchTagSelectProps = {
  tag: string;
  onTagChange: (Event: ChangeEvent<HTMLSelectElement>) => void;
};

const SearchTagSelect: FC<searchTagSelectProps> = ({ tag, onTagChange }) => {
  
  return (
    <>
      <label className="uppercase text-sm font-bold opacity-70">Tags</label>
      <select
        id="search-tag-select"
        className="w-full p-3 mt-2 mb-4 bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        onChange={onTagChange}
        value={tag}
      >
        <option value="">All</option>
        <option value="story">Story</option>
        <option value="poll">Poll</option>
        <option value="comment">Comments</option>
      </select>
    </>
  );
};

export default SearchTagSelect;