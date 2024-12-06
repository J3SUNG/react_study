import { useContext } from "react";
import { context } from "./context";

/**
 * - 주문 내역을 표시하라.
 */

export function CryptoOrder() {
  const { orders } = useContext(context);

  return (
    <div style={{ border: "1px solid black", marginTop: "10px" }}>
      <h2>주문목록</h2>

      {orders.map((order) => {
        return (
          <div key={order.id}>
            <p>주문 {order.message}</p>
          </div>
        );
      })}
    </div>
  );
}
