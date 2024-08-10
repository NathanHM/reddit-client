import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './Root';
import Callback from '../features/Callback';
import Dashboard from '../features/dashboard/Dashboard';
import Post from '../features/post/Post';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='callback' element={<Callback />} />
    <Route path='dashboard' element={<Dashboard />} />
    <Route path=':subreddit/:id' element={<Post />} />
  </Route>
))

function App() {

  return (

    <RouterProvider router={appRouter} />

  );
}

export default App;
