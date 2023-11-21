import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main";
import Join from "../Pages/Join";
import PersonalPage from "../Pages/PersonalPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* main 페이지 */}
        <Route path="/" element={<Main />} />
        {/* join */}
        <Route path="/join" element={<Join />} />
        {/* personal Page  */}
        <Route path="'/personalPage'" element={<PersonalPage />} />
        {/* Not Found */}
        <Route path="*" element={<h1>이상한곳 가지마라...</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
