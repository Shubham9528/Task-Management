import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddNewTask from './component/AddNewTask';
import FetchById from './component/FetchById.jsx';
import UpdateTask from './component/UpdateTask';
import DeleteTask from './component/DeleteTask';
import Login from './component/authentication/Login';
import Register from './component/authentication/Register';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Root Route for App component */}
      <Route path="/" element={<Login />} />
      <Route path="/TaskManager" element={<App />} />
      <Route path="/Register" element={<Register />} />
      {/* Other top-level routes */}
      <Route path="/fetch" element={<FetchById />} />
      <Route path="/tasks" element={<AddNewTask />} />
      <Route path="/update" element={<UpdateTask />} />
      <Route path="/delete" element={<DeleteTask />} />
    </Routes>
  </BrowserRouter>
);
