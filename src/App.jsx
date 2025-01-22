import React, { useState } from "react";
import InputForm from "./components/InputForm"
import MedalList  from "./components/MedalList";


const App = () => {
  const headerContainerCSS = {
    margin: "0 auto 0 auto",
    backgroundColor: "white",
    maxWidth: "100%",
    width : "80%",
    borderRadius: "20px",
    boxShadow: "0px 0px 10px grey",
  };

  return (
    <div style={headerContainerCSS}>
      <InputForm></InputForm>
    </div>
  );
};

export default App;




