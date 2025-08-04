import { Navigate, Route, Routes } from "react-router";
import {AppLayout} from "@/presentation/layout/AppLayout.tsx";
import SignIn from "@/presentation/pages/AuthPages/SignIn.tsx";
import NotFound from "@/presentation/pages/OtherPage/NotFound.tsx";
import Home from "@/presentation/pages/Dashboard/Home.tsx";
import Testimonies from "@/presentation/pages/Testimonies/Testimonies.tsx";
import Missionaries from "@/presentation/pages/Missionaries/Missionaries.tsx";
import MissionaryForm from "@/presentation/pages/Missionaries/MissionaryForm.tsx";
import Subscriptions from "@/presentation/pages/Subscriptions/Subscriptions.tsx";
import SubscriptionForm from "@/presentation/pages/Subscriptions/SubscriptionForm.tsx";
import { useAuth } from "@/domain/hooks/useAuth.ts";
import {TestimoniesProvider} from "@/presentation/context/TestimoniesContext.tsx";

export function RenderRoutes() {
    const { activeUser, isLoading} = useAuth();

    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path="/"
                    element={activeUser || isLoading ? <Home /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/testimonies"
                    element={activeUser || isLoading ? <TestimoniesProvider><Testimonies /></TestimoniesProvider> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/missionaries"
                    element={activeUser || isLoading ? <Missionaries /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/missionaries/create"
                    element={activeUser || isLoading ? <MissionaryForm /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/missionaries/:missionaryId/edit"
                    element={activeUser || isLoading ? <MissionaryForm /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/subscriptions"
                    element={activeUser || isLoading ? <Subscriptions /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/subscriptions/create"
                    element={activeUser || isLoading ? <SubscriptionForm /> : <Navigate to="/signin" replace />}
                />
                <Route
                    path="/subscriptions/:missionaryId/edit"
                    element={activeUser || isLoading ? <SubscriptionForm /> : <Navigate to="/signin" replace />}
                />
            </Route>

            <Route
                path="/signin"
                element={activeUser?.user ? <Navigate to="/" replace /> : <SignIn />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}