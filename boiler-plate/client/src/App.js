import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

const LandingPageWithAuth = Auth(LandingPage, null);
const LoginPageWithAuth = Auth(LoginPage, false);
const RegisterPageWithAuth = Auth(RegisterPage, true);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<LandingPageWithAuth />} />
          <Route path="login" element={<LoginPageWithAuth />} />
          <Route path="register" element={<RegisterPageWithAuth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
