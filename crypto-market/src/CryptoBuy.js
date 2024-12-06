import { useContext, useState, useEffect } from "react";

import { context } from "./context";
import { CryptoTable } from "./CryptoTable";
import { CryptoDetail } from "./CryptoDetail";
import { CryptoBasket } from "./CryptoBasket";

/**
 * - 페이지네이션이 동작하게 하라.
 * setPage(prev => prev + 1);
 * - `INFO` 버튼이 클릭되었을 때 데이터를 넘겨 `CryptoDetail.js`가 올바르게 출력되도록 하라.
 *
 * - `CryptoDetail.js`이 닫힐 경우 ~경로로 get 요청을 보내도록 한다.
 *
 * - `CryptoTable.js` 에서 코인 `BUY` 버튼을 누르면 장바구니에 추가된다. 단, 이미 담겨있다면 무시된다.
 *
 * - `CryptoBasket.js` 에서 코인 빼기 버튼을 눌러 장바구니의 개수가 0이 되면 아이템을 삭제한다.
 *
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
    // const fetchItems = async () => {
    //   try {
    //     const response = await axios.get(`/api/coins?page=${page}`);
    //     setItems(response.data);
    //   } catch (error) {
    //     console.error("Error fetching items:", error); // 에러 처리
    //     setItems(null);
    //   }
    // };

    // fetchItems();
    setItems(COIN_ITEMS[page]);
  }, [page]);

  const handleOpenDetail = (item) => () => {
    setCurrency(item);
  };

  const handleCloseDetail = async () => {
    // try {
    //   const response = await axios.get("api/data/page");
    //   setItems(response.data);
    //   setCurrency(null);
    // } catch (error) {
    //   console.error("Error closing detail view:", error);
    //   setCurrency(null);
    // }
    setCurrency(null);
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
      const next = prev.map((coin) => {
        if (coin.id === item.id) {
          return { ...coin, count: coin.count - 1 };
        }

        return coin;
      });

      const filter = next.filter((coin) => coin.count > 0);

      return filter;
    });
  };

  const handlePlusItem = (item) => () => {
    setBaskets((prev) => {
      const next = prev.map((coin) => {
        if (coin.id === item.id) {
          return { ...coin, count: coin.count + 1 };
        }
        return coin;
      });

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
