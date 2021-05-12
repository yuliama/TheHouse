import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import UserModel from './model/UserModel';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeUser, setActiveUser] = useState(UserModel.loadActiveUser());

  function handleLogout() {
    setActiveUser(null);
    UserModel.logout();
  }
  return (
    <div className="App" style={{ background: "url(" + process.env.PUBLIC_URL + "/images/site-bg.jpg) fixed no-repeat 0 40%" }}>
      <Header></Header>
      <div className="container">
        <HashRouter>
          <Switch>
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/login"><LoginPage activeUser={activeUser} onLogin={user => setActiveUser(user)} /></Route>
            {/* <Route exact path="/signup"><SignupPage activeUser={activeUser} onLogin={user => setActiveUser(user)} /></Route> */}

          </Switch>
        </HashRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
