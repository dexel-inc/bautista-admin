import { createContext, useContext } from "react";
import { useTestimonies } from "@/domain/hooks/useTestimony.ts";

const TestimoniesContext = createContext<any>(null);

export const TestimoniesProvider = ({ children }: { children: React.ReactNode }) => {
    const testimoniesData = useTestimonies();
    return (
        <TestimoniesContext.Provider value={testimoniesData}>
            {children}
        </TestimoniesContext.Provider>
    );
};

export const useTestimoniesContext = () => useContext(TestimoniesContext);