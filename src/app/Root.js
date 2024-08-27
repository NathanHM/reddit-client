import './App.css';
import LogIn from '../features/logIn/LogIn';
import { Outlet, useNavigate } from 'react-router';
import { selectLoggedIn, setId, setAuthCode, setLoggedIn } from '../features/logIn/logInSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { clearPosts } from "../features/dashboard/dashboardSlice";
import homeIcon from '../imgs/home.png';
import refreshIcon from '../imgs/refresh.png';
import logOutIcon from '../imgs/exit.png';
import { useEffect } from 'react';

function Root() {

  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearPosts());
    dispatch(setId(''));
    dispatch(setAuthCode(''));
    dispatch(setLoggedIn(false))
    navigate('/')
  }

  const refresh = () => {
    dispatch(clearPosts());
  }

  const home = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate])


  return (
    <>
      <div className="App">
        <nav>
          {loggedIn ?
            <ul>
              <li>
                <button onClick={home}><img src={homeIcon} alt='home' ></img></button>
              </li>
              <li>
                <button onClick={refresh}><img src={refreshIcon} alt='refresh' ></img></button>
              </li>
              <li>
                <button onClick={handleLogOut}><img src={logOutIcon} alt='log-out' ></img></button>
              </li>
            </ul>
            :
            <LogIn />
          }
        </nav>
      </div>
      <Outlet />
    </>
  );


}

export default Root;
