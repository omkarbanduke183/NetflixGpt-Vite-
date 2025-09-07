import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { applanguage, NETFLIX_LOGO } from "../utils/constants";
import { changeGptVisible, removeGptMovies } from "../utils/gptSlice";
import { changeAppLanguage } from "../utils/appConfigSlice";
import { removeMoviesData } from "../utils/moviesSlice";

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
      dispatch(removeMoviesData())
      dispatch(removeGptMovies())
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
    dispatch(removeGptMovies());
  };
  const changeLanguage = (e) => {
    console.log("language change", e.target.value);
    dispatch(changeAppLanguage(e.target.value));
  };
  return (
    <div className="absolute z-10 w-screen flex flex-col md:flex-row  justify-between bg-gradient-to-b from-black">
      <img
        className="w-30 md:w-48 mx-auto md:mx-0 "
        src={NETFLIX_LOGO}
        alt="logo"
      />
      {userInfo && (
        <div className="flex ml-8 md:ml-0">
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
          <h3 className="py-4 hidden md:block font-bold mr-2 text-white">
            {userInfo.displayName}
          </h3>
          <button
            className={`bg-purple-600 text-white rounded-lg h-8 md:h-10 px-2 mx-3 my-4 md:my-2 cursor-pointer ${
              !isGptVisible ? "ml-20 md:ml-0 " : ""
            }`}
            onClick={onBtnGptSearchClick}
          >
            {isGptVisible ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 mt-2 hidden md:block rounded-lg"
            src={userInfo?.photoURL}
          />
          <button
            onClick={onbtnSignOutClick}
            className="font-bold bg-red-500 text-white rounded-lg h-8 md:h-10 px-2 mx-3 my-4 md:my-2 md:mr-5 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
