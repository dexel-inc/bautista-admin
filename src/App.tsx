import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Missionaries from "./pages/Missionaries/Missionaries.tsx";
import Testimonies from "./pages/Testimonies/Testimonies.tsx";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import MissionaryDetail from "./pages/Missionaries/MissionaryDetail.tsx";
import MissionaryForm from "./pages/Missionaries/MissionaryForm.tsx";
import TestimonyForm from "@/pages/Testimonies/TestimonyForm.tsx";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/testimonies" element={<Testimonies />} />
            <Route path="/testimonies/create" element={<TestimonyForm />} />
            <Route path="/missionaries" element={<Missionaries />} />
            <Route path="/missionaries/create" element={<MissionaryForm />} />
            <Route path="/missionaries/:missionaryId" element={<MissionaryDetail />} />
            <Route path="/missionaries/:missionaryId/edit" element={<MissionaryForm />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
