export const isEmpty = (value) => {
  if (typeof value === typeof "a") {
    if (value.trim() === "") return true;
    else return false;
  } else if (typeof value === typeof []) {
    if (value.length === 0) return true;
    else return false;
  } else if (typeof value === typeof {}) {
    if (Object.keys(value).length === 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const isLength = (value, { min, max } = {}) => {
  if (isEmpty(value)) return false;
  if (typeof value === typeof "") value = value.trim();
  if (typeof value === typeof "" || typeof value === typeof []) {
    let validMin, validMax;
    if (min === null) validMin = true;
    else if (value.length >= min) validMin = true;
    if (max === null) validMax = true;
    else if (value.length <= max) validMax = true;
    return validMin && validMax;
  }
};

export const loginValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.email)) errors.email = "Email required";
  if (isEmpty(credentials.password)) errors.password = "Password required";
  if (!isEmpty(errors)) return errors;
};

export const registerValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.fname)) errors.fname = "First name required";
  else if (isLength(credentials.fname, { min: 2, max: 20 }))
    errors.fname = "First name required";
  if (isEmpty(credentials.lname)) errors.lname = "Last name required";
  if (isEmpty(credentials.email)) errors.email = "Email required";
  if (isEmpty(credentials.contact)) errors.contact = "Contact required";
  if (isEmpty(credentials.password)) errors.password = "Password required";
  else if (isLength(credentials.password, { min: 6 }))
    errors.password = "Password required";
  if (credentials.password !== credentials.password2)
    errors.password2 = "Passwords must match";
  if (!isEmpty(errors)) return errors;
};
