import './App.css';
import Login from './Components/Login';

function App({setCurrentUser}) {
  return (
    <div className="app">
      <Login setCurrentUser={setCurrentUser}></Login>
    </div>
  );
}

export default App;
