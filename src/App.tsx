import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';
import { authorizeUser } from './services/user-service';
import Users from './components/users/users';

const App = () => {
  const [userRole, setUserRole] = useState<userRole>('viewer');
  const user = localStorage.getItem('user');

  if (user) {
    authorizeUser('admin').then(
      (res: boolean) => {
        if (res) setUserRole('admin');
        else {
          authorizeUser('editor')
            .then((res: boolean) => {
              if (res) setUserRole('editor');
            });
        }
      },
    );

    return (
      <div className="App" dir="rtl">
        <HashRouter>
          <Navbar userRole={userRole} />
          <Stars userRole={userRole} />
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
