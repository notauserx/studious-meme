
import { useState, useEffect, useRef, useReducer, useCallback, ChangeEvent, FormEvent, ReactNode } from "react";
import './App.css'
import StoriesContainer from "./components/StoriesContainer";
import TopNavigation from './components/TopNavigation';



const App = () => {

  return (
    <>
        <div className="w-full">
          <TopNavigation></TopNavigation>
        </div>
        <div className="flex relative min-h-screen mx-auto p-8 dark:bg-slate-800 dark:text-gray-200">
          <StoriesContainer />
        </div>
    </>
  );
}

export default App
