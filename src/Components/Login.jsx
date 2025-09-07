import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { validateEmailPassword } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_BG_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignIN, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);

  const onbtnSubmitClick = () => {
    const message = validateEmailPassword(
      email.current.value,
      password.current.value,
      // Only pass confirmPassword for sign up
      !isSignIN ? confirmPassword.current.value : undefined
    );
    console.log(message);
    setErrorMessage(message);
    if (message) return;
    if (!isSignIN) {
      console.log("auth", auth);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              console.log("User signed in:", user);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          // dispatch(addUser({ uid: uid, email: email }));

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // dispatch(removeUser())
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const { uid, email } = user;
          console.log(user);
          // dispatch(addUser({ uid: uid, email: email }));
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // dispatch(removeUser());
        });
    }
  };
  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={NETFLIX_BG_IMAGE}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full md:w-1/3 p-12 text-white absolute rounded-lg  my-36 mx-auto right-0 left-0  bg-black/70"
      >
        <h1 className="text-2xl font-bold">
          {isSignIN ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIN && (
          <input
            ref={name}
            type="text"
            name="name"
            id="name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            placeholder="Username"
          />
        )}
        <input
          ref={email}
          type="text"
          name="email"
          id="email"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          placeholder="Email"
        />
        <input
          ref={password}
          type="password"
          name="password"
          id="password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          placeholder="Password"
        />
        {!isSignIN && (
          <input
            ref={confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            placeholder="Confirm Password"
          />
        )}
        <p className="text-red-600 py-2 font-bold text-lg">{errorMessage}</p>
        <button
          onClick={onbtnSubmitClick}
          className="bg-red-600 cursor-pointer w-full p-4 my-4 rounded-lg"
        >
          {isSignIN ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 cursor-pointer"
          onClick={() => setIsSignIn(!isSignIN)}
        >
          {isSignIN
            ? "Already registered? Sign In Now."
            : "New to Netflix?Please Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default Login;
