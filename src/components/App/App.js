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
  //localStorage.clear()
  //  variables
  const {
    REACT_APP_HOME_PATH,
    REACT_APP_SAVED_NEWS_PATH,
    REACT_APP_DEFAULT_PATH,
  } = process.env;
  const location = useLocation();
  const validate = useFormAndValidation();
  const navigate = useNavigate();

  const isTokenIssued = checkIfNotNull(localStorage.getItem("token"), "");
  const isLoggedIn = checkIfNotNull(localStorage.getItem("loggedIn"), false);
  const isCurrentUser = checkIfNotNull(
    JSON.parse(localStorage.getItem("currentUser")),
    {}
  );
  const areSavedArticles = checkIfNotNull(
    JSON.parse(localStorage.getItem("savedArticles")),
    []
  );

  const areFoundArticles = checkIfNotNull(
    JSON.parse(localStorage.getItem("foundArticles")),
    []
  );

  const [token, setToken] = useState(isTokenIssued);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [currentUser, setCurrentUser] = useState(isCurrentUser);

  const [savedArticles, setSavedArticles] = useState(areSavedArticles);

  const [foundArticles, setFoundArticles] = useState(areFoundArticles);
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});

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

  //  hooks
  useEffect(() => {
    if (token) {
      return setToken(token);
    } else {
      setToken("");
      setLoggedIn(false);
      localStorage.clear();
      return;
    }
  }, [token]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(true);
      return;
    } else {
      setLoggedIn(false);
      localStorage.clear();
      return;
    }
  }, [loggedIn]);

  useEffect(() => {
    function setUserState(data) {
      if (data) {
        return setCurrentUser(data);
      } else {
        setCurrentUser({});
        localStorage.clear();
        return;
      }
    }
    setUserState(currentUser);
  }, [currentUser]);

  useEffect(() => {
    function setFoundArticlesState(data) {
      if (data) {
        setFoundArticles(data);
        return;
      } else {
        setFoundArticles([]);
        localStorage.setItem("foundArticles", []);
        return;
      }
    }
    setFoundArticlesState(foundArticles);
  }, [foundArticles, loggedIn]);

  useEffect(() => {
    function setSavedArticlesState(data) {
      if (data) {
        setSavedArticles(data);
        return;
      } else {
        setSavedArticles([]);
        localStorage.setItem("savedArticles", []);
        return;
      }
    }
    setSavedArticlesState(savedArticles);
  }, [savedArticles]);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

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
        .catch((err) => console.log(err));
    }
    console.log(localStorage);
    console.log("oops again");
    return false;
  };

  ////// login handling
  const handleLogIn = (user) => {
    if (user) {
      setUser(user);
      const tokenIs = localStorage.getItem("token");
      return getSavedArticlesArr(tokenIs)
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
    setFoundArticles([]);
    setStartSearch({});
    handleClosePopup();
  };

  const handleSubmitLogin = () => {
    return auth
      .authorize(validate.values)
      .then((data) => {
        if (data.token) {
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
        return;
      })
      .catch((err) => validate.setSubmitFormError(err));
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

  const props = {
    location,
    ...validate,
    loggedIn,
    popup,
    setPopup,
    handleClosePopup,
    handleNavigate,
    handleSubmitSearch,
    foundArticles,
    savedArticles,
    areSavedArticles,
    handleAddArticle,
    handleDeleteArticle,
    setSavedArticles,
    signIn,
    handleSubmitLogin,
    handleLogOut,
    REACT_APP_HOME_PATH,
    REACT_APP_SAVED_NEWS_PATH,
    navigate,
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
          foundArticles.length < 1 ? (
          <Preloader />
        ) : startSearch.finished && foundArticles.length < 1 ? (
          <NotFound />
        ) : null}

        {location.pathname === REACT_APP_SAVED_NEWS_PATH ||
        (foundArticles.length && foundArticles.length > 0) ? (
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
