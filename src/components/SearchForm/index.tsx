import { ChangeEvent, FC, FormEvent, ReactNode, useState } from "react";
import SeachFormContainer from "./SearchFormContainer";
import SearchInput from "./SearchInput";
import SearchTagSelect from "./SearchTagSelect";

const SearchForm = ({
  term,
  onTermChange,
  tag,
  onTagChange: onTagChange,
  onSearchSubmit,
}: {
  term: string;
  onTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
  tag: string;
  onTagChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => (
  <SeachFormContainer onSearchSubmit={onSearchSubmit}>
    <SearchHeader />
    <SearchInput term={term} onTermChange={onTermChange} />

    <SearchTagSelect tag={tag} onTagChange={onTagChange} />

    <button
      type="submit"
      className="py-3 px-6 my-2 bg-indigo-700 text-white font-medium rounded hover:bg-indigo-500 cursor-pointer ease-in-out duration-300"
    >
      Search
    </button>
  </SeachFormContainer>
);

const SearchHeader = () => (
  <>
    <h2 className="text-2xl font-bold ">Search</h2>
    <p className="my-4 opacity-70">Narrow down on your search</p>
    <hr className="my-6" />
  </>
);

export default SearchForm;
