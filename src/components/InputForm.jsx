import { useState } from "react";
import MedalList from "./MedalList";

const InputForm = () => {
  const inputContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflow: "hidden",
    boxSizing: "border-box",
    gap: "12px",
    padding: "20px",
    margin: "0 auto",
  };
  const InputFormContainer = {
    display: "flex",
    flexWrap: "wrap",
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
    cursor : 'pointer'
  };

  const getInitialMedalRecords = () => {
    const storedRecords = localStorage.getItem("medalRecords");
    return storedRecords ? JSON.parse(storedRecords) : [];
  };

  const [nation, setNation] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSilverMedal] = useState(0);
  const [bronzeMedal, setBronzeMedal] = useState(0);
  const [medalRecords, setMedalRecords] = useState(getInitialMedalRecords);
  localStorage.setItem("medalRecords", JSON.stringify(medalRecords));

  // getInitialMedalRecords() 가 아닌 함수자체를 참조한 이유 : ()를 사용하면 state가 변할때마다 실행되기 때문이다
  // useState의 함수 자체를 전달하면 React는 해당 함수의 반환값을 초기값으로 설전한다.  이를 지연 평가(Lazy Initialization)이라 한다.

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
      const sumMedals = goldMedal + silverMedal + bronzeMedal;

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

  const onUpdate = () => {
    let nationFound = false; // 국가가 존재하는지 확인하는 플래그

    const updatedMedalRecords = medalRecords.map((countries) => {
      if (countries.nation === nation) {
        nationFound = true; // 일치하는 국가가 있음을 표시

        return {
          ...countries, // 기존 데이터를 복사
          nation: nation,
          goldMedal: goldMedal,
          silverMedal: silverMedal,
          bronzeMedal: bronzeMedal,
          sumMedals: goldMedal + silverMedal + bronzeMedal,
        };
      }
      return countries; // 일치하지 않는 경우 기존 데이터 유지
    });
    if (!nationFound) {
      alert("존재하지 않는 국가 입니다."); // 국가가 없을 경우 알림 표시
    }
    setMedalRecords(
      updatedMedalRecords.sort((a, b) => {
        return b.goldMedal - a.goldMedal;
      })
    );
    

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

  const handleDescendingSort= ()=>{
    const sortedRecords = medalRecords.sort(
      (a,b) =>{return b.sumMedals - a.sumMedals}
      )
      console.log(sortedRecords);
      setMedalRecords([...sortedRecords])
  }

  //  리액트가 변화를 감지 하지 못하는 이유는 원본배열을 변경했기 때문이다.
// 따라서 새로운 배열을 반환해서 useState를 통해 저장하면 해결된다.
//  .map or spread 연산자

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
        <button style={haederButtonStyles} onClick={onUpdate}>
          업데이트
        </button>
      </div>
      <MedalList
        handleDelete={handleDelete}
        medalRecords={medalRecords}
        handleDescendingSort={handleDescendingSort}
      ></MedalList>
    </div>
  );
};
export default InputForm;
