import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import UserModel from './model/UserModel';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import ActionsHeader from './components/ActionsHeader/ActionsHeader';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import VotesPage from './pages/VotesPage/VotesPage';
import IssuePage from './pages/IssuePage/IssuePage';
import MessagePage from './pages/MessagePage/MessagePage';
import CompanyPage from './pages/CompanyPage/CompanyPage';
import ProductPage from './pages/ProductPage/ProductPage';
import SupportPage from './pages/SupportPage/SupportPage'; 

function App() {
  const [activeUser, setActiveUser] = useState(UserModel.loadActiveUser());

  function handleLogout() {
    setActiveUser(null);
    UserModel.logout();
  }
  return (
    <div className="App" style={{ background: "url(" + process.env.PUBLIC_URL + "/images/site-bg.jpg) fixed no-repeat 0 40%" }}>



      <HashRouter>
        <Header activeUser={activeUser} onLogout={() => handleLogout()}></Header>
        <ActionsHeader activeUser={activeUser}></ActionsHeader>
        <Switch>
          <div className="container">
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/login"><LoginPage activeUser={activeUser} onLogin={user => setActiveUser(user)} /></Route>
            <Route exact path="/dashBoard"><DashBoardPage activeUser={activeUser}></DashBoardPage></Route>
            <Route exact path="/manageUsers"><ManageUsers activeUser={activeUser}></ManageUsers></Route>
            <Route exact path="/votes"><VotesPage activeUser={activeUser}></VotesPage></Route>
            <Route exact path="/issue"><IssuePage activeUser={activeUser}></IssuePage></Route>
            <Route exact path="/message"><MessagePage activeUser={activeUser}></MessagePage></Route>
            <Route exact path="/company"><CompanyPage activeUser={activeUser}></CompanyPage></Route>
            <Route exact path="/product"><ProductPage activeUser={activeUser}></ProductPage></Route>
            <Route exact path="/support"><SupportPage activeUser={activeUser}></SupportPage></Route>
          </div>
        </Switch>
      </HashRouter>

      <Footer></Footer>
    </div>
  );
}

export default App;
