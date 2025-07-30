import { BrowserRouter as Router} from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import {useEffect} from "react";
import service from "@/domain/services/service.ts";
import {RenderRoutes} from "@/routes";
import {AuthProvider} from "@/domain/contexts/AuthContext.tsx";

export default function App() {
  useEffect(() => {
    service.get(`/sanctum/csrf-cookie`)
  }, []);

  return (
    <AuthProvider>
        <Router>
            <ScrollToTop />
            <RenderRoutes />
        </Router>
    </AuthProvider>
  );
}
