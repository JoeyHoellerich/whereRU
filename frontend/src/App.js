import Nav from './components/Nav';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <Nav></Nav>
        <Home></Home>
      </header>
    </div>
  );
}

export default App;
