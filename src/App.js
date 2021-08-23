import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.components';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux';
import {checkUserSession} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component';

class App extends Component {
  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route 
            path='/'
            component={HomePage}
            exact
          />
          <Route
            path="/shop"
            component={ShopPage}
          />
          <Route
            path='/checkout'
            component={CheckoutPage}
            exact
          />
          <Route
            path="/signin"
            render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}
            exact
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,

})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
