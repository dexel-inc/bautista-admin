import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Missionaries from "./pages/Missionaries/Missionaries.tsx";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePageEditor from "./pages/ContentEditor/HomePageEditor";
import AboutUsEditor from "./pages/ContentEditor/AboutUsEditor";
import MissionaryDetail from "./pages/Missionaries/MissionaryDetail.tsx";
import MissionariesCreateForm from "./pages/Missionaries/MissionariesCreateForm.tsx";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/edit-home" element={<HomePageEditor />} />
            <Route path="/edit-about" element={<AboutUsEditor />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/missionaries" element={<Missionaries />} />
            <Route path="/missionaries/create" element={<MissionariesCreateForm />} />
            <Route path="/missionaries/:missionaryId" element={<MissionaryDetail />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
