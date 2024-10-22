import { useRef, useState, useContext } from "react";
import { context } from "./context";

export function CryptoBasket({
  baskets = [],
  handleSubtractItem,
  handlePlusItem,
  addOrder = () => {},
}) {
  const inputRef = useRef();

  const [message, setMessage] = useState("");

  const ctx = useContext(context);

  addOrder = ctx.addOrder;

  /**
   * ?번 문제
   * 코인 평균 구하기 (코인 하나 당 가격 기준)
   *
   * 장바구니에 아무것도 없으면 0을 출력
   */
  let coinAverage = (() => {
    if (baskets.length === 0) {
      return 0;
    }

    return Math.floor(baskets.reduce((a, c) => a + c.price, 0) / baskets.length);
  })();

  /*
  ?번 문제
  장바구니가 아무것도 없거나, 주문 메세지가 없다면 , 주문 메세지 input을 focus

  경고 메세지를 띄운다는 테스트케이스도 존재했던 것 같음.

    current를 빼놓고, focus, blur 함수를 호출하지 않고 참조하는 장난을 쳐놨음.


    ?번 문제
    조건을 만족하면 주문 목록에 추가되어야 한다.
  */
  const handleOrderButtonClick = () => {
    if (Object(baskets).length === 0 || message === "") {
      inputRef.current.focus();
    } else {
      addOrder(message);
      inputRef.current.blur();
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>장바구니</h2>

      <p>코인 가격 평균: {coinAverage}</p>

      <ul
        style={{
          paddingLeft: 0,
        }}
      >
        {baskets.map((coin, i) => {
          return (
            <li
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>{coin.name}</p>
              <p>{coin.price}</p>
              <div style={{ display: "flex" }}>
                <button onClick={handleSubtractItem(coin)}>-</button>
                <p>{coin.count}</p>
                <button onClick={handlePlusItem(coin)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ display: "flex" }}>
        <input ref={inputRef} value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleOrderButtonClick}>주문하기</button>
      </div>
    </div>
  );
}
