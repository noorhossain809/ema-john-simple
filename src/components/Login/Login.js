
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';





function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then( res => {
      handleResponse(res, true);
    })
  }


  const fbSignIn = () => {
    handleFbSignIn()
    .then( res => {
      handleResponse(res, true);
    })
  }
  
  const signOut = () => {
    handleSignOut()
    .then( res => {
      handleResponse(res, false);
    })
  }

 const handleResponse = (res, redirect) => {
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}


 
  const handleSubmit = (e) => {
          if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then( res => {
        handleResponse(res, true);
      })
}
      if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then( res => {
              handleResponse(res, true);
            })
          }
    e.preventDefault();
}
 
  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === "email") {
        isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        
    }
    if(event.target.name === "password") {
           const isValidPassword = event.target.value.length > 6;
           const isValidHasPassword = /\d{1}/.test(event.target.value);
           isFieldValid = isValidPassword && isValidHasPassword
           
    }
    if(isFieldValid) {
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
    }
  }
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
        }
        <br/>
        <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Register</label>
      <form onSubmit={handleSubmit}>
              {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
              <br/>
             <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email" required/>
             <br/>
             <input type="password" onBlur={handleBlur} name="password" placeholder="Enter your password" required/>
              <br/>
             <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
         {user.error && <p style={{color:'red'}}>The email address is already in use by another account.</p>}
         {user.success && <p style={{color:'green'}}> User {newUser ? 'created' : 'Log In'} successfully</p>}
         
      
    </div>
  );
}

export default Login;