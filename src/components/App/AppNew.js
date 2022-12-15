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

const AppNew = () => {
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

}

export default AppNew;