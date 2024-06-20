import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Crud App/Home';
import { Create } from './Crud App/Create';
import Update from './Crud App/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
