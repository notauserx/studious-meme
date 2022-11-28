
import { useState, useEffect, useRef, useReducer, useCallback, ChangeEvent, FormEvent, ReactNode } from "react";
import './App.css'
import StoriesContainer from "./components/StoriesContainer";


import TopNavigation from './components/TopNavigation';
//import Search from './components/Search';
import useLocalStorageState from "./hooks/useStorageState";



const App = () => {

  return (
    <>
        <div className="w-full">
          <TopNavigation></TopNavigation>
        </div>
        <div className="flex relative min-h-screen mx-auto p-8 dark:bg-slate-800 dark:text-gray-200">
          <StoriesContainer />
        </div>
        <div className="w-full">Footer</div>
    </>
  );
}


const SearchForm = ({
  searchTerm, onSearchInput, onSearchSubmit
}: {
  searchTerm: string,
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void,
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void
}) => (
  <form className='text-center' onSubmit={onSearchSubmit} >
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Submit
    </button>
  </form>
)

const InputWithLabel = ({
  id, label, value, type = 'text', onInputChange, isFocused, children }:
  {
    id: string,
    label: string,
    value: string,
    type?: string,
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isFocused: boolean,
    children: ReactNode
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
}



export default App
