import { useContext, useState, useEffect } from "react";

import { context } from "./context";
import { CryptoTable } from "./CryptoTable";
import { CryptoDetail } from "./CryptoDetail";
import { CryptoBasket } from "./CryptoBasket";

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
    /**
     * axios로 특정 페이지의 코인 데이터를 가져오는 코드가 존재했음.
     */
    setItems(COIN_ITEMS[page]);
  }, [
    /*
      1번 문제
      페이지 상태를 의존성으로 넣어야 페이지네이션 기능이 동작함.
    */
    page,
  ]);

  /*
  CryptoTable에 전달되는 함수를 클로저 함수로 변경하여 3번 문제를 해결
  */
  const handleOpenDetail = (item) => () => {
    setCurrency(item);
  };

  const handleCloseDetail = () => {
    /**
     * ?번 문제
     * CryptoDetail를 닫을 때 axios로 get 요청을 날려야 한다.
     * POST 요청을 날리도록 장난질을 쳐 뒀음.
     */
    /*
    new Promise()
      .then(() => {
        setCurrency(null);
      })
      .catch(() => {
        setCurrency(null);
      });
      */

    setCurrency(null);
  };

  /*
  ?번 문제
  CryptoTable에서 코인 구매 버튼을 누르면 장바구니에 추가된다.
  마찬가지로 클로저 써서 넘겨야할듯
  
  제약조건
  1. 이미 담겨있다면 무시된다.
  */
  const handleBuyCoin = (item) => () => {
    setBaskets((prev) => {
      console.log(prev);

      const coin = prev.find(({ id }) => id === item.id);

      if (coin) {
        return prev;
      }

      const next = [...prev, { ...item, count: 1 }];

      return next;
    });
  };

  /**
   * ??번 문제
   * 장바구니의 개수가 0이 되면 아이템을 삭제한다.
   */
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
