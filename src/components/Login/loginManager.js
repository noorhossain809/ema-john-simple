import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const isSignInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success : true
      }
      console.log(displayName, email, photoURL);
      return isSignInUser;
    })
    .catch(err => {
      console.log(err);
    })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    user.success = true;
    return user;
    console.log('fb user', user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  }

export  const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
       const signOutUser = {
         isSignIn: false,
         name: '',
         email: '',
         password: '',
         photo: '',
         error: '',
         success: false
       }
       return signOutUser;
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
    //   setUser(newUserInfo);
      updateUserName(name)
      return newUserInfo;
      console.log(res)
     // Signed in 
    //  var user = res.user;
      // ...
})
    .catch(error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    // setUser(newUserInfo);
    return newUserInfo;

});
  }

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    //   setUser(newUserInfo);
    //   setLoggedInUser(newUserInfo);
    //   history.replace(from);
      console.log('sign in user info', res.user)
      // Signed in
      // var user = userCredential.user;
      // ...
    })
    .catch( error => {
      const newUserInfo = {};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              return newUserInfo;
            //   setUser(newUserInfo);
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
}

const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      }).then(function() {
        console.log('user name update successfully')
      // Update successful.
    }).catch(function(error) {
      console.log(error)
      // An error happened.
    });
  }