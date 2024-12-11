import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios
      .post("/api/users/login", {
        email: "jt@co.kr",
        password: "123456",
      })
      .then((response) => console.log(response));
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
