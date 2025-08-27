import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log("header render",userInfo)

  const onbtnSignOutClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    console.log("Auth listener mounted");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // console.log("User signed in:", user);console.log
        console.log("onAuthstatechange called",user)
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        console.log("User signed out");
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute z-10 w-screen flex justify-between bg-gradient-to-b from-black">
      <img
        className="w-48 "
        src={NETFLIX_LOGO}

        alt="logo"
      />
      {userInfo && (
        <div className="flex ">
          <h3 className="p-4 font-bold text-white">{userInfo.displayName}</h3>
          <img className="w-10 h-10 rounded-lg" src={userInfo?.photoURL} />
          <button
            onClick={onbtnSignOutClick}
            className="font-bold text-white pb-7 pl-2 cursor-pointer"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
