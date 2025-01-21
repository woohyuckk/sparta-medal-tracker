import React from "react";

const App = () => {
  const headerContainerCSS = {
    margin: "0 auto 0 auto",
    backgroundColor: "white",
    maxWidth: "1400px",
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

const InputForm = () => {
  const inputContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "20px",
  };

  const inputFormStyles = {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    textAlign: "center",
  };

  const haederButtonStyles = {
    backgroundColor: "yellow",
    fontWeight: "bold",
    border: "0px",
    borderRadius: "10px",
    padding: "5px",
  }

  return (
    <div style={inputContainer}>
      <h1> 2025 스파르타 올림픽</h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <div style={inputFormStyles}>
          <span>국가명</span>
          <input type="text" />
        </div>
        <div style={inputFormStyles}>
          <span>금메달</span>
          <input type="number" />
        </div>
        <div style={inputFormStyles}>
          <span>은메달</span>
          <input type="number" />
        </div>
        <div style={inputFormStyles}>
          <span>동메달</span>
          <input type="number" />
        </div>

        <button
          style={haederButtonStyles}
        >
          국가추가
        </button>
        <button
          style={haederButtonStyles}
        >
          업데이트
        </button>
      </div>
    </div>
  );
};
