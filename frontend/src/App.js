import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Play from './components/Play/Play';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import './App.css';
import CurrentUserProvider from './context/CurrentUser';

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path = "/play" element = {<Play />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
