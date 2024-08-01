import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './Root';
import Callback from './Callback';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='callback' element={<Callback />} />
  </Route>
))

function App() {
  return (

    <RouterProvider router={appRouter} />

  );
}

export default App;
