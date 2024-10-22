export function CryptoTable({ page, items = [], handleOpenDetail, handleBuyCoin }) {
  return (
    <div style={{ border: "1px solid black" }}>
      <h2>주문 테이블</h2>

      <table style={{ border: "1px solid black" }}>
        <thead>
          <th>코인명</th>
          <th>코인가격</th>
          <th>정보확인</th>
          <th>구매</th>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  /*
                    4번 문제
                    코인의 가격에 따라 코인 이름의 색상을 다르게 하라는 요구사항
                    가격 기준 아마도 1500?
                  */
                  color: item.price > 1500 ? "green" : "",
                }}
              >
                {item.name}
              </td>
              <td>{item.price}</td>
              <td>
                {/*
                  3번 문제
                  CryptoDetail로 데이터를 넘겨서 모달이 잘 나오도록 해야 함.
                */}
                <button onClick={handleOpenDetail(item)}>INFO</button>
              </td>
              <td>
                <button
                  style={{
                    /**
                     * 2번 문제
                     * margin'l'eft 오타 수정하기
                     */
                    marginLeft: "10px",
                  }}
                  onClick={handleBuyCoin(item)}
                >
                  BUY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>페이지네이션</div>
    </div>
  );
}
