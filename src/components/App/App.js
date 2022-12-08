import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useFormAndValidation } from "../../utils/hooks/UseFormAndValidation";
import * as auth from "../../utils/api/auth";
import { sampleArray } from "../../utils/sampleArray";
import Header from "../Header/Header";
import ProtectedRout from "../ProtectedRout/ProtectedRout";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import PopupWithForm from "../Popups/PopupWithForm/PopupWithForm";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import Cards from "../Cards/Cards";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const isTokenIssued = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [token, setToken] = useState(isTokenIssued);
  const navigate = useNavigate();
  const location = useLocation();
  const validate = useFormAndValidation();
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const arr = sampleArray;
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [submitFormError, setSubmitFormError] = useState("");

  useEffect(() => {
    function setLoggedinState() {
      if (isLoggedIn && isLoggedIn !== null) {
        return setLoggedIn(true);
      }
      return setLoggedIn(false);
    }
    return setLoggedinState();
  }, [isLoggedIn]);

  useEffect(() => console.log(loggedIn), [loggedIn]);

  const closePopup = () => setPopup({});

  const handleClosePopup = () => {
    closePopup();
    validate.resetForm();
    setSubmitFormError("");
  };

  const signIn = () => setPopup({ PopupWithFormIsOpen: true, clicked: false });

  const logOut = () => {
    localStorage.clear();
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
    navigate(path);
    closePopup();
  };

  const handleLogIn = () => {
    localStorage.setItem("loggedIn", true);
  };

  const handleSubmitLogin = () => {
    const email = validate.values.email;
    const password = validate.values.password;
    console.log(email + password);
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          handleLogIn();
          localStorage.setItem("token", data.token);
          closePopup();
          return;
        }
        console.log("oops");
        //throw new Error("Something went wrong");
      })
      .catch((err) => {
        console.log("oops again");
        console.log(err);
        return setSubmitFormError(err);
      });
    //.finally(() => validate.resetForm());
  };

  const props = {
    location,
    loggedIn,
    currentUser,
    setLoggedIn,
    signupSuccess,
    setSignupSuccess,
    handleSubmitLogin,
    ...validate,
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
    submitFormError,
    setSubmitFormError,
  };

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Header {...props} />} />
        <Route
          path={"/saved"}
          element={
            <ProtectedRout loggedIn={loggedIn}>
              <SavedNewsHeader {...props} replace />
            </ProtectedRout>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Main>
        {location.pathname !== "/" ? null : startSearch.started &&
          articles.length < 1 ? (
          <Preloader />
        ) : startSearch.finished && articles.length < 1 ? (
          <NotFound />
        ) : null}

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
