import { useRef, useState, useContext } from "react";
import { context } from "./context";

/**
 * - 장바구니에 있는 코인의 평균을 계산해라. (코인의 개수는 고려x, 장바구니에 아무것도 없으면 0)
 *  reduce((a, b) => a + b, 0)
 * - 장바구니가 비었거나, 주문 메세지가 없으면 주문 input을 focus 하고 경고 메세지를 출력하라.
 * inputReft.current.focus();
 * - 장바구니가 존재하고, 주문 메세지가 존재하면 주문 목록에 추가한다.
 * ctx = useContext(context);
 * addOrder = ctx.addOrder;
 */

export function CryptoBasket({ baskets = [], handleSubtractItem, handlePlusItem }) {
  const inputRef = useRef();

  const [alert, setAlert] = useState(null);

  const [message, setMessage] = useState("");

  const { addOrder } = useContext(context);

  let coinAverage = (() => {
    if (baskets.length === 0) {
      return 0;
    }

    return Math.floor(baskets.reduce((a, c) => a + c.price, 0) / baskets.length);
  })();

  let coinSum = (() => {
    if (baskets.length === 0) {
      return 0;
    }

    return baskets.reduce((a, c) => a + c.price * c.count, 0);
  })();

  const handleOrderButtonClick = () => {
    if (Object(baskets).length === 0 || message === "") {
      setAlert("경고");
      inputRef.current.focus();
    } else {
      setAlert("");
      addOrder(message);
      inputRef.current.blur();
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <h2>장바구니</h2>

      <p>코인 가격 평균: {coinAverage}</p>
      <p>코인 가격 합계: {coinSum}</p>

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

      <div>
        <p style={{ color: "red" }}>{alert}</p>
      </div>
    </div>
  );
}
