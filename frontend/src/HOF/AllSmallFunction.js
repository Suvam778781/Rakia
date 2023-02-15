const converttoUpper = (str) => {
    str = str
      .split(" ")
      .map((ele) => {
        return ele.charAt(0).toUpperCase() + ele.slice(1);
      })
      .join(" ");
    return str;
  };
  export {converttoUpper}