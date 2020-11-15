export const isEmpty = (value) => {
  let empty = false;
  if (!value) empty = true;
  else if (typeof value === typeof "a" && value.trim().length === 0)
    empty = true;
  else if (typeof value === typeof [] && value.length === 0) empty = true;
  else if (typeof value === typeof {} && Object.keys(value).length === 0)
    empty = true;
  return empty;
};

export const isLength = (value, { min, max } = {}) => {
  if (isEmpty(value)) return false;
  if (typeof value === typeof "") value = value.trim();
  if (typeof value === typeof "" || typeof value === typeof []) {
    let validMin, validMax;
    if (isEmpty(min)) validMin = true;
    else if (value.length >= min) validMin = true;
    if (isEmpty(max)) validMax = true;
    else if (value.length <= max) validMax = true;
    return validMin && validMax;
  }
};

export const loginValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.email)) errors.email = "Email required";
  if (isEmpty(credentials.password)) errors.password = "Password required";
  else if (!isLength(credentials.password, { min: 6 }))
    errors.password = "Password must contain atleast 6 chars";
  if (!isEmpty(errors)) return errors;
};

export const registerValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.fname)) errors.fname = "First name required";
  else if (!isLength(credentials.fname, { min: 2, max: 20 }))
    errors.fname = "First name must be atleast 2 chars";
  if (isEmpty(credentials.lname)) errors.lname = "Last name required";
  if (isEmpty(credentials.email)) errors.email = "Email required";
  if (isEmpty(credentials.contact)) errors.contact = "Contact required";
  if (isEmpty(credentials.password)) errors.password = "Password required";
  else if (!isLength(credentials.password, { min: 6 }))
    errors.password = "Password must contain atleast 6 chars";
  if (credentials.password !== credentials.confirm_password)
    errors.confirm_password = "Passwords must match";
  if (!isEmpty(errors)) return errors;
};

export const updateUserValidation = (details) => {
  console.log(details);
  const errors = {};
  errors.testing = "testing";
  if (!isEmpty(errors)) return errors;
};
