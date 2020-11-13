const safeAssign = (value, alt) => {
  console.log(value);
  if (value) return value;
  else {
    console.log("value found to be empty");
    return alt;
  }
};

export default safeAssign;
