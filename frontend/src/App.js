import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route  path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<SignUp />} />
        <Route path = "/play" element = {<></>} />
      </Routes>
    </Router>
  );
}

export default App;
