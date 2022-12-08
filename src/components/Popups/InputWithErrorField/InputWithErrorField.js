import { useRef, useEffect } from "react";

const InputWithErrorField = (props) => {
  const ref = useRef("");
  useEffect(() => {
    ref.current.value = props.values[props.name]
      ? props.values[props.name]
      : "";
  }, [props.values, props.name]);
  const error = props.errors[props.name];
  return (
    <label className="form__label">
      {props.title}
      <input className="form__input" required {...props} ref={ref} />
      {error ? <p className="form__input form__input_error">{error}</p> : null}
    </label>
  );
};

export default InputWithErrorField;
