import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import AllListings from './components/AllListings';
import CreateCar from './components/CreateCar';
import Details from './components/Details';
import Edit from './components/Edit';
import MyCars from './components/MyCars';
import Footer from './components/Footer';
import Search from './components/Search';

import { AuthContext } from './Contexts/AuthContext';
import { useContext, useEffect } from 'react';

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {
      authToken: null,
      userId: null,
      email: null,
    }

    setUser(user);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/all-listings' component={AllListings} />
        <Route exact path='/create-car' component={CreateCar} />
        <Route exact path='/details/:id' component={Details} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route exact path='/my-listings' component={MyCars} />
        <Route exact path='/by-year' component={Search} />
      </Switch>
      <Footer />
      </>
  );
}

export default App;
