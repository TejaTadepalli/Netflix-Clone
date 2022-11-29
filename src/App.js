import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {auth} from './firebase';
import {useDispatch, useSelector} from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);  //we can use this to check if the user is logged in or not
  const dispatch=useDispatch(); //we can use this to dispatch actions to the store

  useEffect(() => {
    //if user is logged in, redirect to home page
    const unsubscribe=auth.onAuthStateChanged((userAuth) => { //we will use unsubscribe to remove the extra memory being used by the listener
      if (userAuth) {
        //console.log(userAuth);  //will put the user data in store and show on console
        dispatch(
          login({  //will use payload of user data for login
          
          uid:userAuth.uid, //on the console it will show as "uid"
          email:userAuth.email, //on the console it will show as "email"
          })
        );
      } else {
        //console.log("user is logged out");  //will display on console
        dispatch(logout()); //resets the user to NULL value
      }
    });

    return unsubscribe;
  },[dispatch]);

  return (
    <div className="app">
      {/*<h1>Let's Build NETFLIX</h1>*/}
      {/*<HomeScreen /> */}
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
          <Route path="/profile" element={<ProfileScreen />} /> {/*When we click on Profile Button, we can see the information*/}
          <Route exact path="/" element={<HomeScreen />} /> {/*Element is what is to be rendered and we want an exact path*/}
        </Routes>
          )}
      </Router>
    </div>
  );
}

export default App;
