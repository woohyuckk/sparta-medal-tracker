import { useState, useEffect } from "react";
import MedalList from "./MedalList";

const InputForm = () => {
  const inputContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflow :'hidden',
    boxSizing : 'border-box',
    gap: "12px",
    padding: "20px",
    margin : '0 auto'
  };
  const InputFormContainer = {
    display: "flex",
    flexWrap : 'wrap',
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
  };
  const getInitialMedalRecords = () => {
    const storedRecords = localStorage.getItem("medalRecords");
    return storedRecords ? JSON.parse(storedRecords) : [];
  }

  const [nation, setNation] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSilverMedal] = useState(0);
  const [bronzeMedal, setBronzeMedal] = useState(0);
  const [medalRecords, setMedalRecords] = useState(getInitialMedalRecords);

  // getInitialMedalRecords() 가 아닌 함수자체를 참조한 이유 : ()를 사용하면 state가 변할때마다 실행되기 때문이다
  // useState의 함수 자체를 전달하면 React는 해당 함수의 반환값을 초기값으로 설전한다.  이를 지연 평가(Lazy Initialization)이라 한다. 



  useEffect(() => {
    localStorage.setItem("medalRecords", JSON.stringify(medalRecords));
  }, [medalRecords]);

  // useEffect medalRecords의 상태가 변할때마다 localStorage에 저장

  const onSubmit = () => {
  
    // 중복 여부 확인
    const isDuplicate = medalRecords.some(
      (nations) => nations.nation === nation
    );
    if (isDuplicate) {
      alert("이미 등록된 국가입니다.");
      return; // 중단
    }
    // 숫자 유효성 확인
    if (goldMedal >= 0 && silverMedal >= 0 && bronzeMedal >= 0) {
      // 새 국가 추가
      const sumMedals = goldMedal+silverMedal+bronzeMedal;
      
        
      const newNation = {
        nation,
        goldMedal,
        silverMedal,
        bronzeMedal,
        sumMedals,
      };
      

      setMedalRecords(
        [...medalRecords, newNation].sort((a, b) => {
          // 둘 다 문자인 경우, 한글 및 영어의 비교 (localeCompare 사용)
          // 금메달 순 정렬
          return b.goldMedal - a.goldMedal;
        })
      );

      alert("국가가 성공적으로 추가되었습니다.");
    } else {
      alert("0 이상의 숫자만 입력 가능합니다.");
    }
    // 초기화
    setNation("");
    setGoldMedal("");
    setSilverMedal("");
    setBronzeMedal("");
  
  };

  const handleDelete = (nation) => {
    const updatedRecords = medalRecords.filter(
      (record) => record.nation !== nation
    );
    setMedalRecords(updatedRecords);
  };

  return (
    <div style={inputContainer}>
      <h1> 2025 스파르타 올림픽</h1>
      <div style={InputFormContainer}>
        <div style={inputFormStyles}>
          <span>국가명</span>
          <input
            type="text"
            value={nation}
            onChange={(e) => {
              setNation(e.target.value);
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>금메달</span>
          <input
            type="text"
            value={goldMedal}
            onChange={(e) => {
              setGoldMedal(Number(e.target.value));
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>은메달</span>
          <input
            type="text"
            value={silverMedal}
            onChange={(e) => {
              setSilverMedal(Number(e.target.value));
            }}
          />
        </div>
        <div style={inputFormStyles}>
          <span>동메달</span>
          <input
            type="text"
            value={bronzeMedal}
            onChange={(e) => {
              setBronzeMedal(Number(e.target.value));
            }}
          />
        </div>

        <button style={haederButtonStyles} onClick={onSubmit}>
          국가추가
        </button>
        <button style={haederButtonStyles}>업데이트</button>
      </div>
      <MedalList
        handleDelete={handleDelete}
        medalRecords={medalRecords}
      ></MedalList>
    </div>
  );
};
export default InputForm;
