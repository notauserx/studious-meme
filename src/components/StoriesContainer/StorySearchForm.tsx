import { ChangeEvent, FC, FormEvent, ReactNode, useState } from "react";

type SeachFormContainerProps = {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const StorySeachFormContainer: React.FC<SeachFormContainerProps> = ({
  onSearchSubmit,
  children,
}) => (
  <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-xl">
    <div className="max-w-md mx-auto space-y-6">
      <form onSubmit={onSearchSubmit}>{children}</form>
    </div>
  </div>
);

const StorySearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
  <StorySeachFormContainer onSearchSubmit={onSearchSubmit}>
    <StorySearchHeader />
    <StorySearchInput searchTerm={searchTerm} onSearchInput={onSearchInput} />

    <StorySearchTagSelect tag="" />

    <button
      type="submit"
      className="py-3 px-6 my-2 bg-indigo-700 text-white font-medium rounded hover:bg-indigo-500 cursor-pointer ease-in-out duration-300"
    >
      Search
    </button>
  </StorySeachFormContainer>
);

const StorySearchHeader = () => (
  <>
    <h2 className="text-2xl font-bold ">Search</h2>
    <p className="my-4 opacity-70">Narrow down on your search</p>
    <hr className="my-6" />
  </>
);

const StorySearchInput = ({
  searchTerm,
  onSearchInput,
}: {
  searchTerm: string;
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <label className="uppercase text-sm font-bold opacity-70">Query</label>
    <input
      id="search-query"
      type="text"
      className="p-3 mt-2 mb-4 w-full bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
      onChange={onSearchInput}
      value={searchTerm}
    />
  </>
);

type tagSelectProps = {
  tag: string;
};

const StorySearchTagSelect: FC<tagSelectProps> = ({ tag }) => {
  const [searchTag, setSearchTag] = useState(tag);

  const changeTag = (newTag: string): void => {
    setSearchTag(newTag);
  };

  return (
    <>
      <label className="uppercase text-sm font-bold opacity-70">Tags</label>
      <select
        id="search-tag-select"
        className="w-full p-3 mt-2 mb-4 bg-white dark:bg-gray-900 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
        onChange={(event) => changeTag(event.target.value)}
        value={searchTag}
      >
        <option value="">All</option>
        <option value="story">Story</option>
        <option value="poll">Pnll</option>
        <option value="comments">Comments</option>
      </select>
    </>
  );
};

export default StorySearchForm;
