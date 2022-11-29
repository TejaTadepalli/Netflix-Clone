import React,{useRef} from 'react';
import './SignupScreen.css';
import {auth} from '../firebase';

function SignupScreen() {

  const emailRef = useRef(null);  //useRef() is a React hook that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
  const passwordRef = useRef(null); //we are basically using a reference to whatever is being typed in these fields

  const register = (e) => {
    e.preventDefault(); // This stops the refresh of the form

    auth.createUserWithEmailAndPassword(   //This is a method that creates a new user with an email and password
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {  //This will collect the user data and display on console
      console.log(authUser);
    }).catch((error) => {
      alert(error.message); //This will show the error message
    })
  }

  const signIn= (e) => {
    e.preventDefault(); // This stops the refresh of the form when we click Sign In Button

    auth.signInWithEmailAndPassword(   //This is a method that signs in the user with an email and password
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {  //This will collect the user data and display on console
      console.log(authUser);
    }).catch((error) => {
      alert(error.message); //This will show the error message
    }
    )
  }

  return (
    <div className='signupScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} type='email' placeholder='Email' />
            <input ref={passwordRef} type='password' placeholder='Password' />
            <button type='submit' onClick={signIn}>Sign In</button>
            <h4>
                <span className='signupScreen_gray'>New to Netflix? </span>
                <span className='signupScreen_link' onClick={register}>Sign up now.</span>
            </h4>
        </form>
    </div>
  )
}

export default SignupScreen