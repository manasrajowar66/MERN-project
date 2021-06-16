import React from "react";
import spinnerGif from "../../img/loader.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinnerGif}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </>
  );
};

export default Spinner;
