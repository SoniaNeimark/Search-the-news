import Popup from "../Popup/Popup";
import InputWithErrorField from "../InputWithErrorField/InputWithErrorField";

const PopupWithForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.popup.signupPopup ? props.setSignupSuccess(true) : props.handleSubmitLogin();
  };
  const handleSuccess = () => {
    props.setPopup({ PopupWithFormIsOpen: true });
    props.setSignupSuccess(false);
  };
  const handleLink = () => {
    props.signupSuccess
      ? handleSuccess()
      : !props.popup.signupPopup
      ? props.setPopup({ signupPopup: true, PopupWithFormIsOpen: true })
      : props.setPopup({
          PopupWithFormIsOpen: true,
          clicked: false,
        });
  };
  return (
    <Popup {...props} opened={props.popup.PopupWithFormIsOpen}>
      <button
        className="close-button"
        type="button"
        onClick={props.closePopup}
      ></button>
      <form
        className={`form${props.signupSuccess ? " form_alert" : ""}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form__content">
          <h2 className="form__title">
            {!props.signupSuccess
              ? props.popup.signupPopup
                ? "Sign up"
                : "Sign in"
              : "Registration successfully completed!"}
          </h2>
          {!props.signupSuccess ? (
            <>
              <InputWithErrorField
                error={{ message: "test" }}
                title="Email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <InputWithErrorField
                title="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                minLength={8}
              />
              {props.popup.signupPopup ? (
                <InputWithErrorField
                  title="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  minLength={2}
                  maxLength={30}
                />
              ) : null}

              <button className={`submit-button${props.isValid ? " submit-button_active" : ""}`} type="submit" disabled={!props.isValid}>
                {!props.popup.signupPopup ? "Sign in" : "Sign up"}
              </button>
            </>
          ) : null}

          <p
            className={`form__bottom ${
              props.signupSuccess ? "form__bottom_alert" : ""
            }`}
          >
            {!props.signupSuccess ? "or " : ""}
            <span className="form__link" onClick={handleLink}>
              {props.popup.signupPopup || props.signupSuccess ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
