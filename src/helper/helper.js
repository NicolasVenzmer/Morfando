const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const isEmpty = stringToValidate => {
  if (stringToValidate !== undefined && stringToValidate !== null) {
    return stringToValidate.length === 0;
  }

  return true;
};

export default {
  validateEmail,
  isEmpty,
};