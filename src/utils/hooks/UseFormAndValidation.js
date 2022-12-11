import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitFormError, setSubmitFormError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false,
      newSubmitFormError = ""
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setSubmitFormError(newSubmitFormError);
    },
    [setValues, setErrors, setIsValid, setSubmitFormError]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
    submitFormError,
    setSubmitFormError,
  };
}
