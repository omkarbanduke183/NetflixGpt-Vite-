import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { applanguage, NETFLIX_LOGO } from "../utils/constants";
import { changeGptVisible } from "../utils/gptSlice";
import { changeAppLanguage } from "../utils/appConfigSlice";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user);
  const isGptVisible = useSelector((store) => store.gpt.isGptVisible);
  const dispatch = useDispatch();
  console.log("header render", userInfo);

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
        console.log("onAuthstatechange called", user);
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

  const onBtnGptSearchClick = () => {
    dispatch(changeGptVisible());
  };
  const changeLanguage = (e) => {
    console.log("language change", e.target.value);
    dispatch(changeAppLanguage(e.target.value));
  };
  return (
    <div className="absolute z-10 w-screen flex justify-between bg-gradient-to-b from-black">
      <img className="w-48 " src={NETFLIX_LOGO} alt="logo" />
      {userInfo && (
        <div className="flex ">
          {isGptVisible && (
            <select
              className="bg-gray-600 px-2 text-white mt-4 mr-3 h-8 text-xs"
              onChange={changeLanguage}
            >
              {applanguage.map((lang) => (
                <option key={lang.identity} value={lang.identity}>
                  {lang.language}
                </option>
              ))}
            </select>
          )}
          <h3 className="py-4  font-bold text-white">{userInfo.displayName}</h3>
          <button
            className="bg-purple-600 text-white rounded-lg h-10 px-2 mx-3 my-2 cursor-pointer"
            onClick={onBtnGptSearchClick}
          >
            {isGptVisible ? "HomePage" : "GPT Search"}
          </button>
          <img className="w-10 h-10 mt-2 rounded-lg" src={userInfo?.photoURL} />
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
