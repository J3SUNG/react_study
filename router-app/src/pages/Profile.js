import { useParams } from "react-router-dom";

const data = {
  jetty: {
    name: "Jetty",
    description: "제티는 간식을 좋아해",
  },
  coke: {
    name: "Coke",
    description: "콜라는 공놀이를 좋아해",
  },
};

const Profile = () => {
  const params = useParams();
  const profile = data[params.username];

  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};

export default Profile;
