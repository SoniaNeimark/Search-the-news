import React, { useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../../utils/cotexts/CurrentUserContext";
import { DocPropsContext } from "../../utils/cotexts/DocPropsContext";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useFormAndValidation } from "../../utils/hooks/UseFormAndValidation";
import * as auth from "../../utils/api/auth";
import * as mainApi from "../../utils/api/MainApi";
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
  //const isLoggedIn = localStorage.getItem("loggedIn");
  const isTokenIssued = localStorage.getItem("token");
  const areSavedArticles = JSON.parse(localStorage.getItem("savedArticles"));
  //const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [token, setToken] = useState(isTokenIssued);
  const navigate = useNavigate();
  const location = useLocation();
  const validate = useFormAndValidation();
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  //const [isValid, setIsValid] = useState(false);
  const arr = sampleArray;
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(areSavedArticles);
  const [currentUser, setCurrentUser] = useState({});
  const [submitFormError, setSubmitFormError] = useState("");
  const loggedIn = token ? true : false;

  //useEffect(() => localStorage.clear(), [])
  useEffect(() => console.log(localStorage));

  /*useEffect(() => {
    const setLoggedinState = () => {
      if (isLoggedIn && isLoggedIn !== null) {
        return setLoggedIn(true);
      }
      return setLoggedIn(false);
    };
    setLoggedinState();
  }, [isLoggedIn]);*/

  useEffect(() => {
    const setTokenState = () => {
      console.log("token")
      if (isTokenIssued && isTokenIssued !== null) {
        return setToken(isTokenIssued);
      }
      return setToken("");
    };
    setTokenState();
  }, [isTokenIssued]);

  /* useEffect(() => {
    const setSavedArticlesState = () => {
      if (areSavedArticles && areSavedArticles !== null) {
        return setSavedArticles(areSavedArticles);
      }
      return setSavedArticles([]);
    };
    setSavedArticlesState();
  }, [areSavedArticles]);*/

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        return auth
          .getUser(token)
          .then((user) => {
            if (user.email) {
              return setCurrentUser(user);
            }
            setCurrentUser({});
            localStorage.clear();
          })
          .catch((err) => {
            err && console.log(err);
          });
      }
      return localStorage.clear();
    };
    checkToken();
  }, [token]);

  /*useEffect(() => {
    
    const setSavedArticlesState = () => {
      if (areSavedArticles && areSavedArticles !== null) {
        return setSavedArticles(areSavedArticles);
      }
      return setSavedArticles([]);
    };
    setSavedArticlesState()
  }, [areSavedArticles]);*/

  useEffect(() => {
    const getSavedArticles = () => {
      if (token) {
        return mainApi
          .getArticles(token)
          .then((articlesArrr) => {
            if (articlesArrr) {
              return localStorage.setItem(
                "savedArticles",
                JSON.stringify(articlesArrr)
              );
            }
            return localStorage.removeItem("savedArticles");
          })
          .catch((err) => console.log(err));
      }
      return;
    };

    getSavedArticles();
  }, [token]);

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

  /*useEffect(() => {
    //setIsValid(true);
    setSavedArticles(arr);
  }, [arr]);*/

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

  /*const handleLogIn = () => {
    localStorage.setItem("loggedIn", true);
  };*/

  const handleSubmitLogin = () => {
    const email = validate.values.email;
    const password = validate.values.password;
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          //handleLogIn();
          localStorage.setItem("token", data.token);
          handleClosePopup();
          return;
        }
        throw new Error("Something went wrong");
      })
      .catch((err) => {
        return setSubmitFormError(err);
      });
  };

  const handleSaveArticle = (articleObj) => {
    /*"keyword";
    "title";
    "text";
    "date";
    "source";
    "link";
    "image";*/
    return mainApi
      .addArticle(articleObj, token)
      .then((article) => {
        if (article) {
          const newArr = [...areSavedArticles, article];
          return localStorage.setItem("savedArticles", JSON.stringify(newArr));
        }
        throw Error("ooooooops");
      })
      .catch((err) => console.log(err));
  };

  const props = {
    location,
    loggedIn,
    currentUser,
    signupSuccess,
    setSignupSuccess,
    handleSubmitLogin,
    ...validate,
    signIn,
    logOut,
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
    handleSaveArticle,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DocPropsContext.Provider value={props}>

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
        {location.pathname === "/" ? <About /> : null}
      </Main>
      <Footer {...props} />
      <PopupWithForm {...props} />
      </DocPropsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
