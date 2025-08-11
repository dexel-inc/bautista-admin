import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import PageBreadcrumb from "@/presentation/components/common/PageBreadCrumb.tsx";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import Button from "@/presentation/components/ui/button/Button.tsx";
import { useSubscriptions } from "@/domain/hooks/useSubscription.ts";

interface FormErrors {
    email?: string | null;
    general?: string | null;
}

export default function SubscriptionForm() {
    const { storeOrUpdateSubscription } = useSubscriptions();
    const navigate = useNavigate();

    const [email, setContactEmail] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateContactEmail = (value: string) => {
        setContactEmail(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = "El correo electrónico es requerido";
        else if (!emailRegex.test(value)) newErrors.email = "Formato de correo inválido";
        else delete newErrors.email;

        setErrors(newErrors);
    };

    const formIsValid = (): boolean => {
        validateContactEmail(email);
        return Object.keys(errors).length === 0;
    };

    const handleAddEvent = async () => {
        if (!formIsValid()) return;

        const data = {
            email: email.trim(),
        };

        try {
            await storeOrUpdateSubscription(data);
            navigate(`/subscriptions`);
        } catch (error) {
            setErrors({ general: "Ocurrió un error al guardar la suscripción" });
        }
    };

    return (
        <>
        <PageMeta title="IBF - Añadir Suscripción" description="Personas que siguen el contenido de la iglesia bautista fundamental" />

            <PageBreadcrumb
                pageTitle="Añadir Suscripción"
                others={
                    <li className="text-sm self-center">
                        <Link className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/subscriptions">
                            Suscripciones
                            <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </li>
                }
            />
            {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">{errors.general}</div>}

            <div className="flex justify-center">
                <ComponentCard className="w-3/4">
                    <div className="space-y-6 px-2 mt-8">
                        <div className="w-full">
                            <label className="block text-sm font-medium dark:text-white">Correo electrónico <span className="text-error-500">*</span></label>
                            <input
                                type="email"
                                value={email}
                                placeholder="ministerio@ministerio.com"
                                onChange={(e) => validateContactEmail(e.target.value)}
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button variant="primary" onClick={handleAddEvent}>Guardar</Button>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}