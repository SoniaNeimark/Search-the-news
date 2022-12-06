import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { sampleArray } from "../../utils/sampleArray";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import PopupWithForm from "../Popups/PopupWithForm/PopupWithForm";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import Cards from "../Cards/Cards";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const arr = sampleArray;
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const closePopup = () => setPopup({});
  
  const signIn = () => setPopup({ PopupWithFormIsOpen: true, clicked: false });

  const logOut = () => {
    setLoggedIn(false);
    navigate("/");
    closePopup();
  };

  useEffect(() => {
    setIsValid(true);
    setSavedArticles(arr);
    setCurrentUser({ name: "Sonia" });
  }, [arr]);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleNavigate = (path) => {
    props.navigate(path);
    props.closePopup();
  };

  const handleSubmitLogin = () => {
    setLoggedIn(true);
    closePopup();
  };

  const props = {
    location,
    loggedIn,
    currentUser,
    setLoggedIn,
    signupSuccess,
    setSignupSuccess,
    handleSubmitLogin,
    signIn,
    logOut,
    isValid,
    articles,
    arr,
    savedArticles,
    setArticles,
    setStartSearch,
    closePopup,
    popup,
    setPopup,
    navigate,
    handleNavigate,
  };
  
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Header {...props} />} />
        <Route path={"/saved"} element={<SavedNewsHeader {...props} />} />
      </Routes>
      <Main>
        {startSearch.started && articles.length < 1 ? <Preloader /> : null}
        {startSearch.finished && articles.length < 1 ? <NotFound /> : null}

        {location.pathname === "/saved" ||
        (articles.length && articles.length > 0) ? (
          <Cards {...props} />
        ) : null}
        <About />
      </Main>
      <Footer {...props} />
      <PopupWithForm {...props} />
    </>
  );
}

export default App;
