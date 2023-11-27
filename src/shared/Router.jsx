import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../Pages/Join";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import PersonalPage from "../Pages/PersonalPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/personalPage" element={<PersonalPage />} />
        <Route path="*" element={<h1>이상한곳 가지마라...</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
