import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../Pages/Join";
<<<<<<< HEAD
import Login from "../Pages/Login";
=======
>>>>>>> crud
import Main from "../Pages/Main";
import PersonalPage from "../Pages/PersonalPage";
import SampleLayout from "../Pages/sample/SampleLayout";
import SampleMain from "../Pages/sample/SampleMain";
import SampleJoin from "../Pages/sample/Samplejoin.jsx";

const Router = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        {/* main 페이지 */}
        <Route path="/" element={<Main />} />
        {/* login */}
        <Route path="/login" element={<Login />} />
        {/* join */}
        <Route path="/join" element={<Join />} />
        {/* personal Page  */}
        <Route path="'/personalPage'" element={<PersonalPage />} />
        {/* Not Found */}
        <Route path="*" element={<h1>이상한곳 가지마라...</h1>} />
      </Routes>
=======
      <SampleLayout>
        <Routes>
          {/* main 페이지 */}
          <Route path="/" element={<Main />} />
          {/* Sample입니다. */}
          <Route path="/SampleMain" element={<SampleMain />} />
          <Route path="/SampleJoin" element={<SampleJoin />} />
          {/* join */}
          <Route path="/join" element={<Join />} />
          {/* personal Page  */}
          <Route path="'/personalPage'" element={<PersonalPage />} />
          {/* Not Found */}
          <Route path="*" element={<h1>이상한곳 가지마라...</h1>} />
        </Routes>
      </SampleLayout>
>>>>>>> crud
    </BrowserRouter>
  );
};

export default Router;
