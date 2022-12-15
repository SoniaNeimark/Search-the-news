import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { CurrentUserContext } from "../../utils/cotexts/CurrentUserContext";
import { useFormAndValidation } from "../../utils/hooks/UseFormAndValidation";
import * as auth from "../../utils/api/auth";
import * as mainApi from "../../utils/api/MainApi";
import { getFoundArticles } from "../../utils/api/NewsApi";
import { checkIfNotNull, checkIfSaved } from "../../utils/callbacks/callbacks";
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
const App = () => {
  //localStorage.clear();
  //  variables
  const {
    REACT_APP_HOME_PATH,
    REACT_APP_SAVED_NEWS_PATH,
    REACT_APP_DEFAULT_PATH,
  } = process.env;
  const location = useLocation();
  const validate = useFormAndValidation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [currentUser, setCurrentUser] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [savedArticles, setSavedArticles] = useState(null);
  const [foundArticles, setFoundArticles] = useState(null);
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});
  const [submitFormError, setSubmitFormError] = useState("");
  console.log(
    token +
      ", " +
      loggedIn +
      ", " +
      checkIfNotNull(currentUser, "no user") +
      ", " +
      checkIfNotNull(savedArticles, "no articles saved") +
      ", " +
      checkIfNotNull(foundArticles, "no articles found")
  );

  // methods
  const signIn = () => setPopup({ PopupWithFormIsOpen: true, clicked: false });

  const closePopup = () => {
    setPopup({});
  };

  const handleClosePopup = () => {
    validate.resetForm();
    closePopup();
  };

  const handleNavigate = (path) => {
    navigate(path);
    closePopup();
  };

  //  set states
  const setUser = (user) => {
    if (user) {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return;
    }
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.clear();
    return;
  };

  const setSavedArticlesArr = (arr) => {
    if (arr) {
      setSavedArticles(arr);
      localStorage.setItem("savedArticles", JSON.stringify(arr));
      return;
    }
    localStorage.removeItem("savedArticles");
    return;
  };

  const setFoundArticlesArr = (arr) => {
    if (arr) {
      setFoundArticles(arr);
      localStorage.setItem("foundArticles", JSON.stringify(arr));
      return;
    }
    localStorage.removeItem("foundArticles");
    return;
  };

  //  api-requests
  ////  authorization api-requests and login handling
  ////// token-check
  const checkToken = (tokenIs) => {
    if (tokenIs) {
      return auth
        .getUser(tokenIs)
        .then((data) => {
          if (data.email) {
            setToken(tokenIs);
            return data;
          }
          return false;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
    return false;
  };

  ////// login handling
  const handleLogIn = (user) => {
    if (user) {
      setUser(user);
      //const tokenIs = localStorage.getItem("token");
      return getSavedArticlesArr(token)
        .then((articles) => {
          if (articles) {
            setSavedArticlesArr(articles);
            localStorage.setItem("savedArticles", JSON.stringify(articles));
            return;
          }
          setSavedArticles([]);
          localStorage.removeItem("savedArticles");
          return;
        })
        .catch((err) => console.log(err))
        .finally(() => handleClosePopup());
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setFoundArticles([]);
    setStartSearch({});
    handleClosePopup();
    return;
  };

  const handleSubmitRegister = () => {
    auth
      .register(validate.values)
      .then((data) => {
        if (data._id) {
          setSignupSuccess(true);
          return;
        }
        throw Error();
      })
      .catch((err) => validate.setSubmitFormError(err.message));
  };

  const handleSubmitLogin = () => {
    return auth
      .authorize(validate.values)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          return data.token;
        }
        return false;
      })
      .then((tokenGot) => {
        if (tokenGot) {
          return checkToken(tokenGot);
        }
        return false;
      })
      .then((data) => {
        if (data) {
          handleLogIn(data);
          return;
        }
        localStorage.clear();
        handleLogOut();
        return;
      })
      .catch((err) => setSubmitFormError(err.message));
  };

  ////  Main-api requests and saved articles handling
  const getSavedArticlesArr = (tokenIs) => {
    return mainApi
      .getArticles(tokenIs)
      .then((articles) => {
        if (articles) {
          return articles;
        }
        return false;
      })
      .catch((err) => console.log(err));
  };

  const handleAddArticle = (article) => {
    return mainApi
      .addArticle(article, token)
      .then((article) => {
        if (article) {
          return getSavedArticlesArr(token)
            .then((gotArticles) => {
              if (gotArticles) {
                setSavedArticlesArr(gotArticles);
                return;
              }
              throw Error("No saved articles");
            })
            .catch((err) => console.log(err));
        }
        throw Error("something went wrong");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteArticle = (article) => {
    const inSaved = () => {
      return savedArticles.filter((el) => checkIfSaved(el, article))[0];
    };
    const savedArticle = inSaved();
    return mainApi
      .deleteArticle(token, savedArticle._id)
      .then((res) => {
        if (!res.message) {
          return getSavedArticlesArr(token)
            .then((gotArticles) => {
              if (gotArticles) {
                setSavedArticlesArr(gotArticles);
                return;
              }
              throw new Error("No more saved articles");
            })
            .catch((err) => console.log(err));
        }
        const error = new Error("Something went wrong");
        error.name = res.name;
        error.message = res.message;
        throw error;
      })
      .catch((err) => console.log(err));
  };

  // News-api requests and found articles handling
  const getFoundArticlesArr = (keyWord) => {
    return getFoundArticles(keyWord)
      .then((gotArticles) => {
        if (gotArticles.articles) {
          return gotArticles.articles.map((el) => {
            const article = {};
            article.keyword = keyWord;
            article.date = el.publishedAt;
            article.title = el.title;
            article.link = el.url;
            article.image = el.urlToImage;
            article.text = el.description;
            article.source = el.source.name;
            return article;
          });
        }
        throw Error("Smth went wrong");
      })

      .catch((err) => console.log(err));
  };

  const handleSubmitSearch = () => {
    setStartSearch({ started: true });
    return getFoundArticlesArr(validate.values["search"])
      .then((resultArray) => {
        if (resultArray) {
          return resultArray;
        }
        throw Error("Something went wrong");
      })
      .then((articlesGot) => {
        if (articlesGot) {
          setFoundArticlesArr([...articlesGot]);
          localStorage.setItem("foundArticles", JSON.stringify(articlesGot));
          return;
        }
        throw Error("Something went wrong");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setStartSearch({ finished: true });
        return;
      });
  };

  //  hooks
  useEffect(() => {
    const tokenIs = checkIfNotNull(localStorage.getItem("token"), "");
    return setToken(tokenIs);
  }, []);

  useEffect(() => {
    const loggedInIs = checkIfNotNull(localStorage.getItem("loggedIn"), false);
    setLoggedIn(loggedInIs);
  }, []);

  useEffect(() => {
    const userIs = checkIfNotNull(localStorage.getItem("currentUser"), false)
      ? JSON.parse(localStorage.getItem("currentUser"))
      : {};
    setCurrentUser(userIs);
  }, []);

  useEffect(() => {
    const foundArticlesAre = checkIfNotNull(
      localStorage.getItem("foundArticles"),
      false
    )
      ? JSON.parse(localStorage.getItem("foundArticles"))
      : [];
    setFoundArticles(foundArticlesAre);
  }, []);

  useEffect(() => {
    const savedArticlesAre = checkIfNotNull(
      localStorage.getItem("savedArticles"),
      false
    )
      ? JSON.parse(localStorage.getItem("savedArticles"))
      : [];
    setSavedArticles(savedArticlesAre);
  }, []);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const props = {
    location,
    ...validate,
    loggedIn,
    popup,
    setPopup,
    handleClosePopup,
    signupSuccess,
    setSignupSuccess,
    handleNavigate,
    handleSubmitSearch,
    foundArticles,
    savedArticles,
    handleAddArticle,
    handleDeleteArticle,
    setSavedArticles,
    signIn,
    handleSubmitLogin,
    handleSubmitRegister,
    handleLogOut,
    REACT_APP_HOME_PATH,
    REACT_APP_SAVED_NEWS_PATH,
    navigate,
    submitFormError,
    setSubmitFormError,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path={REACT_APP_HOME_PATH} element={<Header {...props} />} />
        <Route
          path={REACT_APP_SAVED_NEWS_PATH}
          element={
            <ProtectedRout loggedIn={loggedIn}>
              <SavedNewsHeader {...props} replace />
            </ProtectedRout>
          }
        />
        <Route
          path={REACT_APP_DEFAULT_PATH}
          element={<Navigate to={REACT_APP_HOME_PATH} />}
        />
      </Routes>
      <Main>
        {location.pathname !==
        REACT_APP_HOME_PATH ? null : startSearch.started &&
          !Array.isArray(foundArticles) ? (
          <Preloader preloader={false} />
        ) : startSearch.finished && !Array.isArray(foundArticles) ? (
          <NotFound searchError={false} />
        ) : null}

        {location.pathname === REACT_APP_SAVED_NEWS_PATH ||
        Array.isArray(foundArticles) ? (
          <Cards {...props} />
        ) : null}
        {location.pathname === REACT_APP_HOME_PATH ? <About /> : null}
      </Main>
      <Footer {...props} />
      <PopupWithForm {...props} />
    </CurrentUserContext.Provider>
  );
};

export default App;
