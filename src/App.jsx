import React, { useState } from "react";

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

  const InputFormContainer = {
    display: "flex",
    gap: "12px",
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
      <div style={InputFormContainer}>
        <div style={inputFormStyles}>
          <span>국가명</span>
          <input
            type="string"
            value={nation}
            onChange={(e) => {
              setNation(e.target.value);
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>금메달</span>
          <input
            type="number"
            value={goldMedal}
            onChange={(e) => {
              setGoldMedal(e.target.value);
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>은메달</span>
          <input
            type="number"
            value={silverMedal}
            onChange={(e) => {
              setSilverMedal(e.target.value);
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>동메달</span>
          <input
            type="number"
            value={bronzeMedal}
            onChange={(e) => {
              setBronzeMedal(e.target.value);
            }}
          />
        </div>

        <button
          style={haederButtonStyles}
          onClick={() => {
            // 중복 여부 확인
            const isDuplicate = medalRecords.some(
              (nations) => nations.nation === nation
            );
            if (isDuplicate) {
              alert("이미 등록된 국가입니다.");
              return; // 중단
            }

            // 중복이 없으면 새 국가 추가
            const newNation = {
              nation,
              goldMedal: Number(goldMedal), // 숫자로 변환
              silverMedal: Number(silverMedal),
              bronzeMedal: Number(bronzeMedal),
            };
            setMedalRecords([...medalRecords, newNation]);
          }}
        >
          국가추가
        </button>
        <button style={haederButtonStyles}>업데이트</button>
      </div>
    </div>
  );
};
