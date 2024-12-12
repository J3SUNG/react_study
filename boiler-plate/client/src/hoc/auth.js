import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../_actions/userAction";

export default function auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      async function checkAuth() {
        const response = await dispatch(authUser());

        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      }

      checkAuth();
    }, []);

    return <SpecificComponent />;
  }

  return (props) => <AuthenticationCheck />;
}
