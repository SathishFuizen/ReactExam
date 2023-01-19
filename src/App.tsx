import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./Form"
import View from './View/View';
import ViewIteam from './Viewitem';

import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';


function App() {
  return (
   <>
   <BrowserRouter>
   {/* <div className="navigation">
          <Link className='btn' to="view">View</Link>
          <Link className='btn' to="create">create</Link>
        </div> */}
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/view" element={<View />} />
          <Route path="/view/:id" element={<ViewIteam/>} />
          <Route path="/create" element={<Form />} />
          <Route path="/update/:id" element={<Form />} />
        </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
