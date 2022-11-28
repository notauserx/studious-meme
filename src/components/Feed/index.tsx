import { useState, useEffect, useRef } from "react";

import useStorageState from "../../hooks/useStorageState";

const [searchTerm, setSearchTerm] = useStorageState("searchTerm", "");

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
};

const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  setUrl(`${API_ENDPOINT}${searchTerm}`);
};

const SideBar = () => (
  <>
    <SearchForm
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
    />
  </>
);

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <form className="text-center" onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Submit
    </button>
  </form>
);

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}: {
  id: string;
  label: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  children: React.ReactNode;
}) => {
  // A. create a ref with react's useRef hook
  const inputRef = useRef<HTMLInputElement>(null);

  // C
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B. pass input ref to JSX-reserved ref attr*/}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  );
};

export default SideBar;
