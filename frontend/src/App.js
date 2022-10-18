import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <Nav />
        {/* <Home></Home> */}
        {/* <Login /> */}
        <SignUp />
      </header>
    </div>
  );
}

export default App;
