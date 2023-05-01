import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <ul>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles/jetty">jetty의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/coke">coke의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/duri">존재하지 않는 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/jetty1">존재하지 않는 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/jetty/123">존재하지 않는 프로필</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
