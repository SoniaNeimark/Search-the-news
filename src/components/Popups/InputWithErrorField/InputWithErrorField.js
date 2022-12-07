const InputWithErrorField = (props) => {
  const error = props.error;
  return (
    <label className="form__label">
      {props.title}
      <input className="form__input" required {...props} />
      {error ? (
        <p className="form__input form__input_error">{error.message}</p>
      ) : null}
    </label>
  );
};

export default InputWithErrorField;
