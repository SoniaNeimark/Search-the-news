import React, { useState, useEffect, useCallback } from "react";
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
import {
  defaultPath,
  homePath,
  savedNewsPath,
} from "../../utils/constants/constants";
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
import { sampleArray } from "../../utils/sampleArray";

const AppNew = () => {
  const checkIfNotNull = (value, result) => {
    return value !== null ? value : result;
  };
  const isLoggedIn = checkIfNotNull(localStorage.getItem("loggedIn"), false);
  const isTokenIssued = checkIfNotNull(localStorage.getItem("token"), "");
  const isCurrentUser = checkIfNotNull(
    JSON.parse(localStorage.getItem("currentUser")),
    {}
  );
  const areSavedArticles = checkIfNotNull(
    JSON.parse(localStorage.getItem("savedArticles")),
    []
  );
  const areArticlesToSave = checkIfNotNull(
    JSON.parse(localStorage.getItem("articlesToSave")),
    []
  );
  const areArticlesToRemove = checkIfNotNull(
    JSON.parse(localStorage.getItem("articlesToRemove")),
    []
  );
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [token, setToken] = useState(isTokenIssued);
  const [currentUser, setCurrentUser] = useState({});

  const [savedArticles, setSavedArticles] = useState([]);
  const [articlesToSave, setArticlesToSave] = useState([]);
  const [articlesToRemove, setArticlesToRemove] = useState([]);

  const [foundArticles, setFoundArticles] = useState([]);
  const [popup, setPopup] = useState({});
  const [startSearch, setStartSearch] = useState({});

  const location = useLocation();
  const validate = useFormAndValidation();
  const navigate = useNavigate();

  //useEffect(() => console.log(localStorage));
  //useEffect(() => localStorage.clear())

  useEffect(() => {
    (() => {
      if (isTokenIssued) {
        setToken(isTokenIssued);
      } else {
        setToken("");
      }
    })();
  });

  const checkToken = () => {
    console.log(localStorage);
    if (token) {
      return auth
        .getUser(token)
        .then((data) => {
          if (data.email) {
            console.log(data);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("currentUser", JSON.stringify(data));
          } else {
            localStorage.clear();
          }
        })
        .catch((err) => console.log(err));
    } else {
      return localStorage.clear();
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  const getSavedArticles = () => {
    if (token) {
      return mainApi
        .getArticles(token)
        .then((articles) => {
          if (articles) {
            localStorage.setItem("savedArticles", JSON.stringify(articles));
          } else {
            localStorage.removeItem("savedArticles");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getSavedArticles();
  }, []);

  useEffect(() => {
    const setLoggedInState = () => {
      if (isLoggedIn) {
        setLoggedIn(isLoggedIn);
      } else {
        setLoggedIn(false);
      }
    };
    setLoggedInState();
  });

  useEffect(() => {
    (() => {
      if (isCurrentUser) {
        return setCurrentUser(isCurrentUser);
      } else {
        return setCurrentUser({});
      }
    })();
  }, []);

  useEffect(() => {
    (() => {
      if (areSavedArticles) {
        return setSavedArticles(areSavedArticles);
      } else {
        return setSavedArticles([]);
      }
    })();
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

  const closePopup = () => {
    setPopup({});
  };

  const handleClosePopup = () => {
    validate.resetForm();
    closePopup();
  };

  const handleLogIn = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", true);
    handleClosePopup();
  };

  const handleLogOut = () => {
    localStorage.clear();
    handleClosePopup();
  };

  const handleNavigate = (path) => {
    navigate(path);
    closePopup();
  };

  const signIn = () => setPopup({ PopupWithFormIsOpen: true, clicked: false });

  const handleSubmitLogin = () => {
    return auth
      .authorize(validate.values)
      .then((data) => {
        if (data.token) {
          return handleLogIn(data.token);
        }
      })
      .catch((err) => validate.setSubmitFormError(err));
  };

  const handleAddArticle = (article) => {
    return mainApi.addArticle(article, token).then((article) => {
      if (article) {
        setSavedArticles([...savedArticles, article]);
      }
    });
  };

  const handleDeleteArticle = (article) => {
    return mainApi
      .deleteArticle(token, article._id)
      .then(() => {
        function findUnEqual(el) {
          return el._id !== article._id;
        };
        const updatedArticles = savedArticles.filter(findUnEqual);
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
      })
      .then(setSavedArticles([...areSavedArticles]));
  };

  const props = {
    location,
    ...validate,
    loggedIn,
    popup,
    setPopup,
    handleClosePopup,
    handleNavigate,
    setStartSearch,
    setFoundArticles,
    foundArticles,
    savedArticles,
    areSavedArticles,
    handleAddArticle,
    handleDeleteArticle,
    setSavedArticles,
    articlesToSave,
    articlesToRemove,
    signIn,
    handleSubmitLogin,
    handleLogOut,
    homePath,
    savedNewsPath,
    defaultPath,
    sampleArray,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path={homePath} element={<Header {...props} />} />
        <Route
          path={savedNewsPath}
          element={
            <ProtectedRout loggedIn={loggedIn}>
              <SavedNewsHeader {...props} replace />
            </ProtectedRout>
          }
        />
        <Route path={defaultPath} element={<Navigate to={homePath} />} />
      </Routes>
      <Main>
        {location.pathname !== homePath ? null : startSearch.started &&
          foundArticles.length < 1 ? (
          <Preloader />
        ) : startSearch.finished && foundArticles.length < 1 ? (
          <NotFound />
        ) : null}

        {location.pathname === savedNewsPath ||
        (foundArticles.length && foundArticles.length > 0) ? (
          <Cards {...props} />
        ) : null}
        {location.pathname === homePath ? <About /> : null}
      </Main>
      <Footer {...props} />
      <PopupWithForm {...props} />
    </CurrentUserContext.Provider>
  );
};

export default AppNew;
