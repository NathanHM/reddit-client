import './App.css';
import LogIn from '../features/logIn/LogIn';
import { Outlet, useNavigate } from 'react-router';
import { selectLoggedIn } from '../features/logIn/logInSlice';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearPosts } from "../features/dashboard/dashboardSlice";
import { setId, setAuthCode, setLoggedIn } from "../features/logIn/logInSlice";

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


  return (
    <>
      <div className="App">

        {loggedIn ?
          <nav>
            <ul>
              <li>
                <button onClick={home}>Home</button>
              </li>
              <li>
                <button onClick={refresh}>Refresh</button>
              </li>
              <li>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </nav>
          :
          <LogIn />
        }

      </div>
      <Outlet />
    </>

  );


}

export default Root;
