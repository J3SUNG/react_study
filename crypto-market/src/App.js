import { useState } from "react";
import { context } from "./context";
import { CryptoBuy } from "./CryptoBuy";
import { CryptoOrder } from "./CryptoOrder";

export default function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = (message) => {
    setOrders((prev) => {
      const next = [...prev, { message }];

      return next;
    });
  };

  return (
    <context.Provider value={{ orders, addOrder }}>
      <CryptoBuy />
      <CryptoOrder />
    </context.Provider>
  );
}
