import React from 'react';
import TopNav from './Components/TopNav';
import HomePage from './Components/HomePage'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import List from './Components/List';
import FavouritesList from './Components/FavouritesList';
import FavouritesPage from './Components/FavouritePage';
import MainList from './Components/MainList'


import { BrowserRouter, Route } from 'react-router-dom';


const MainPage = () => <div><TopNav></TopNav><HomePage></HomePage><List></List><MainList></MainList></div>
const SecondPage = () => <div><TopNav></TopNav><FavouritesPage></FavouritesPage><FavouritesList></FavouritesList></div>









class App extends React.Component {
  render(){
    return(
      <div>
      <BrowserRouter>
     
      <Route exact={true} path="/" component={MainPage} />
      <Route exact={true} path="/favourites" component={SecondPage} />
      </BrowserRouter>
      </div>

    )
  }
}

export default App;
