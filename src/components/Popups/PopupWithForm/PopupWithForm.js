import Popup from "../Popup/Popup";
import InputWithErrorField from "../InputWithErrorField/InputWithErrorField";

const PopupWithForm = (props) => {
  const { values, errors } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.popup.signupPopup
      ? props.handleSubmitRegister()
      : props.handleSubmitLogin();
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
        onClick={props.handleClosePopup}
      ></button>
      <form
        name="popupform"
        className={`form${props.signupSuccess ? " form_alert" : ""}`}
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => props.handleChange(e)}
        onFocus={() => props.setSubmitFormError("")}
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
                values={values}
                errors={errors}
                title="Email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <InputWithErrorField
                values={values}
                errors={errors}
                title="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                minLength={8}
              />
              {props.popup.signupPopup ? (
                <InputWithErrorField
                  values={values}
                  errors={errors}
                  title="Username"
                  name="name"
                  type="text"
                  placeholder="Username"
                  minLength={2}
                  maxLength={30}
                />
              ) : null}
              {props.submitFormError ? (
                <p className="form__input form__input_error form__input_error_bottom">
                  {props.submitFormError}
                </p>
              ) : null}
              <button
                className={`submit-button${
                  props.isValid ? " submit-button_active" : ""
                }`}
                type="submit"
                disabled={!props.isValid}
              >
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
            <span className="form__link hover-opacity" onClick={handleLink}>
              {props.popup.signupPopup || props.signupSuccess
                ? "Sign in"
                : "Sign up"}
            </span>
          </p>
        </div>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
