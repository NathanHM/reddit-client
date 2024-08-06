import './App.css';
import LogIn from '../features/logIn/LogIn';

function Root() {
  const getData = async () => {
    const data = await fetch('https://www.reddit.com/r/MarvelStudiosSpoilers.json');
    const json = await data.json();
    console.log(json.data.children)
  }

  return (
    <>
      <div className="App">
        <button onClick={getData}>Click</button>
        <LogIn />
      </div>
    </>

  );
}

export default Root;
