import './App.css';
import LogIn from '../features/logIn/LogIn';
import { Outlet } from 'react-router';

function Root() {

  return (
    <>
      <div className="App">
        <LogIn />
      </div>
      <Outlet />
    </>

  );
}

export default Root;
