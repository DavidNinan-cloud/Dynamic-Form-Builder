import * as React from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  Redirect,
  useLocation,
} from "react-router-dom";
import Body from './Drawer/Body';
import { ElementsContextProvider } from './DrawerContextApi/elementsContextArr';

function App() {
  return (
    <BrowserRouter>
    <ElementsContextProvider>
    <div>
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
      <Body />
    </div>
    </ElementsContextProvider>
    </BrowserRouter>
  );
}

export default App;
