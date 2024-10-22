export function CryptoDetail({ currency, handleCloseDetail }) {
  return (
    <>
      {currency && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.2)",
              position: "absolute",
            }}
          />

          <div
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              minWidth: "300px",
              minHeight: "300px",
              padding: "15px",
            }}
          >
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <button onClick={handleCloseDetail}>x</button>
            </div>

            <h2>{currency.name}</h2>
            <p>{currency.price}</p>
          </div>
        </div>
      )}
    </>
  );
}
