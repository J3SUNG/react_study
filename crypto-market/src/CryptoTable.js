/**
 * - `BUY` 버튼 옆 margin 값이 `10px`를 가지도록 하라
 * - 코인의 가격이 1500상이면 코인 이름을 green 색상으로 표시하라.
 */

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
                  color: item.price > 1500 ? "green" : "",
                }}
              >
                {item.name}
              </td>
              <td>{item.price}</td>
              <td>
                <button onClick={handleOpenDetail(item)}>INFO</button>
              </td>
              <td>
                <button
                  style={{
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
