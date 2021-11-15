import { useEffect, useState } from "react";
import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebaseInitialization from "./../firebase/firebase.init.js";
import {useHistory} from "react-router-dom";
firebaseInitialization();

// Providers
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const fbProvider = new FacebookAuthProvider();

const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [ isAdmin, setIsAdmin ]= useState(false);


  // clear error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  // if (user){
  //   checkAdmin(user.email);
  //
  // }

  useEffect(()=>{
    if (user){
      console.log(user.email);
        checkAdmin(user.email);

      }
  },[])

  // google sign in
  function signInWithGoogle(location, history) {
    // return signInWithPopup(auth, googleProvider);
    signInWithPopup(auth, googleProvider)
        .then((result) => {
          setUser(result.user);
          const user = result.user;
          saveUser(user.email, user.displayName, 'PUT');
          checkAdmin(email);
          setError('');
          const destination = location?.state?.from || '/home';
          history.replace(destination);
        }).catch((error) => {
      setError(error.message);
    }).finally(() => setLoading(false));
  }

  // gitHub sign in
  function signInWithGithub() {
    return signInWithPopup(auth, gitHubProvider);
  }

  // facebook sign in
  function signInWithFacebook() {
    return signInWithPopup(auth, fbProvider);
  }
  // Email sign in
  function signInWithEmail(location,history) {

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          const user = userCredential.user;
          saveUser(user.email, user.displayName, 'PUT');
          checkAdmin(email);
          const destination = location?.state?.from || '/home';
          history.replace(destination);
          setError('');
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
  }
  // set name and profile image url
  function setNameAndImage() {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  }

  function emailVerify() {
    sendEmailVerification(auth.currentUser).then(() => {
      alert(`An Verification mail has been set to ${email}`);
    });
  }

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (signedInUser) => {
      if (signedInUser) {
        setUser(signedInUser);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // sign out
  function logOut() {
    signOut(auth)
      .then((res) => {
        setUser({});
        setIsAdmin(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // reset password
  function passwordReset(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email has been sent");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  // sign up with email password
  function singUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT');

        setNameAndImage();
        alert("user has been created");
        history.push("/home");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function checkAdmin(email){
    fetch(
        `http://localhost:5000/users/${email}`
    )
        .then((res) => res.json())
        .then((data) => {
          if (data){
            console.log(data);
            if (data.role === 'admin'){
              setIsAdmin(true);
              console.log(isAdmin);
            }
          }

        });
  }

  // sign up with email password
  function signIn(e) {
    e.preventDefault();

  }


  // get name
  function getName(e) {
    setName(e?.target?.value);
  }

  // get Email
  function getEmail(e) {
    setEmail(e?.target?.value);
  }
  // Get password
  function getPassword(e) {
    setPassword(e?.target?.value);
  }
  // Get photoUrl
  function getPhoto(e) {
    setPhoto(e?.target?.value);
  }

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch('http://localhost:5000/users', {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
        .then()
  }

  return {
    signInWithEmail,
    signInWithFacebook,
    signInWithGithub,
    logOut,
    signInWithGoogle,
    user,
    isAdmin,
    setUser,
    error,
    setError,
    getPassword,
    getEmail,
    singUp,
    signIn,
    getPhoto,
    getName,
    passwordReset,
    loading,
  };
};

export default useFirebase;
