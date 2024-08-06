import './App.css';
import LogIn from '../features/logIn/LogIn';
import { Outlet } from 'react-router';
import { selectAuthCode } from '../features/logIn/logInSlice';
import { useSelector } from 'react-redux';

function Root() {

  const authCode = useSelector(selectAuthCode);
  console.log(authCode)

  return (
    <>
      <div className="App">
        <LogIn />
      </div>
      <p>{authCode}</p>
      <Outlet />
    </>

  );
}

export default Root;
