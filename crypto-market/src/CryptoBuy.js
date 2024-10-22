import { useContext, useState, useEffect } from "react";

import { context } from "./context";
import { CryptoTable } from "./CryptoTable";
import { CryptoDetail } from "./CryptoDetail";
import { CryptoBasket } from "./CryptoBasket";

/**
 * - 페이지네이션이 동작하게 하라.
 * - `INFO` 버튼이 클릭되었을 때 데이터를 넘겨 `CryptoDetail.js`가 올바르게 출력되도록 하라.
 * - `CryptoDetail.js`이 닫힐 경우 ~경로로 get 요청을 보내도록 한다.
 * - `CryptoTable.js` 에서 코인 `BUY` 버튼을 누르면 장바구니에 추가된다. 단, 이미 담겨있다면 무시된다.
 * - `CryptoBasket.js` 에서 코인 빼기 버튼을 눌러 장바구니의 개수가 0이 되면 아이템을 삭제한다.
 */

const COIN_ITEMS = [
  [
    {
      id: 0,
      name: "BTC",
      price: 1591,
    },
    {
      id: 1,
      name: "ETH",
      price: 389,
    },
    {
      id: 2,
      name: "USDT",
      price: 157,
    },
  ],
];

export function CryptoBuy() {
  const ctx = useContext(context);

  const [items, setItems] = useState();

  const [currency, setCurrency] = useState(null);

  const [page, setPage] = useState(0);

  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    Promise.resolve(COIN_ITEMS[page]).then((items) => {
      setItems(items);
    });
  }, [page]);

  const handleOpenDetail = (item) => () => {
    Promise.resolve().then(() => {
      setCurrency(item);
    });
  };

  const handleCloseDetail = () => {
    Promise.resolve()
      .then(() => {
        setCurrency(null);
      })
      .catch(() => {
        setCurrency(null);
      });
  };

  const handleBuyCoin = (item) => () => {
    setBaskets((prev) => {
      const coin = prev.find(({ id }) => id === item.id);

      if (coin) {
        return prev;
      }

      const next = [...prev, { ...item, count: 1 }];

      return next;
    });
  };

  const handleSubtractItem = (item) => () => {
    setBaskets((prev) => {
      const next = [...prev];

      const coinIdx = next.findIndex(({ id }) => id === item.id);

      if (coinIdx === -1) {
        return prev;
      }

      const coin = next[coinIdx];

      if (coin.count - 1 === 0) {
        next.splice(coinIdx, 1);

        return next;
      }

      coin.count = coin.count - 1;

      return next;
    });
  };

  const handlePlusItem = (item) => () => {
    setBaskets((prev) => {
      const next = [...prev];

      const coin = next.find(({ id }) => id === item.id);

      if (!coin) {
        return prev;
      }

      coin.count = coin.count + 1;

      return next;
    });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <CryptoTable
          page={page}
          items={items}
          handleOpenDetail={handleOpenDetail}
          handleBuyCoin={handleBuyCoin}
        />
        <CryptoBasket
          baskets={baskets}
          handleSubtractItem={handleSubtractItem}
          handlePlusItem={handlePlusItem}
        />
      </div>

      <CryptoDetail currency={currency} handleCloseDetail={handleCloseDetail} />
    </div>
  );
}
