const MedalList = ({handleDelete, medalRecords}) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>총 합</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {medalRecords.map((record) => (
              <tr key={record.nation}>
                <td>{record.nation}</td>
                <td>{record.goldMedal}</td>
                <td>{record.silverMedal}</td>
                <td>{record.bronzeMedal}</td>
                <td>{record.sumMedals}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(record.nation)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default MedalList
