import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import PageBreadcrumb from "@/presentation/components/common/PageBreadCrumb.tsx";
import { Link, useNavigate, useParams } from "react-router";
import DropzoneComponent from "@/presentation/components/form/form-elements/DropZone.tsx";
import { useEffect, useState } from "react";
import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import Button from "@/presentation/components/ui/button/Button.tsx";
import TextArea from "@/presentation/components/form/input/TextArea.tsx";
import { useMissionaries, useMissionary } from "@/domain/hooks/useMissionary.ts";

interface FormErrors {
    familyName?: string | null;
    description?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    imageFile?: string | null;
    general?: string | null;
}

export default function MissionaryForm() {
    const { missionaryId } = useParams();
    const { missionary } = useMissionary(parseInt(missionaryId ?? ""));
    const { storeOrUpdateMissionary } = useMissionaries();
    const navigate = useNavigate();

    const [familyName, setFamilyName] = useState("");
    const [description, setDescription] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (missionary) {
            setFamilyName(missionary.title ?? "");
            setDescription(missionary.message ?? "");
            setContactName(missionary.user?.name ?? "");
            setContactEmail(missionary.user?.email ?? "");
        }
    }, [missionary]);

    const validateFamilyName = (value: string) => {
        setFamilyName(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) newErrors.familyName = "El nombre de la familia es requerido";
        else if (value.length < 3) newErrors.familyName = "Debe tener al menos 3 caracteres";
        else if (value.length > 100) newErrors.familyName = "No puede superar los 100 caracteres";
        else delete newErrors.familyName;

        setErrors(newErrors);
    };

    const validateContactName = (value: string) => {
        setContactName(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) newErrors.contactName = "El nombre de contacto es requerido";
        else if (value.length < 3) newErrors.contactName = "Debe tener al menos 3 caracteres";
        else delete newErrors.contactName;

        setErrors(newErrors);
    };

    const validateContactEmail = (value: string) => {
        setContactEmail(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.contactEmail = "El correo electrónico es requerido";
        else if (!emailRegex.test(value)) newErrors.contactEmail = "Formato de correo inválido";
        else delete newErrors.contactEmail;

        setErrors(newErrors);
    };

    const validateDescription = (value: string) => {
        setDescription(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) newErrors.description = "La descripción es requerida";
        else if (value.length < 10) newErrors.description = "Debe tener al menos 10 caracteres";
        else delete newErrors.description;

        setErrors(newErrors);
    };

    const validateImage = (file: File | null) => {
        setUploadFile(file);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!file && !missionary) newErrors.imageFile = "La imagen es obligatoria en creación";
        else if (file && file.size > 2 * 1024 * 1024) newErrors.imageFile = "La imagen no debe superar los 2MB";
        else delete newErrors.imageFile;

        setErrors(newErrors);
    };

    const formIsValid = (): boolean => {
        validateFamilyName(familyName);
        validateContactName(contactName);
        validateContactEmail(contactEmail);
        validateDescription(description);
        validateImage(uploadFile);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateEvent = async () => {
        if (!formIsValid()) return;

        const data = {
            title: familyName.trim(),
            message: description.trim(),
            user: {
                name: contactName.trim(),
                email: contactEmail.trim(),
            },
            imageFile: uploadFile ?? null,
            status: "active",
        };

        try {
            const missionaryModified = await storeOrUpdateMissionary(data, missionary);
            navigate(`/missionaries/${missionaryModified.id}`);
        } catch (error) {
            setErrors({ general: "Ocurrió un error al guardar el misionero" });
        }
    };

    return (
        <>
            <PageMeta title="IBF - Añadir misionero" description="Familias que apoyan la iglesia bautista fundamental" />

            <PageBreadcrumb
                pageTitle={missionary ? "Editar " + missionary.title : "Añadir Misionero"}
                others={
                    <li className="text-sm self-center">
                        <Link className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/missionaries">
                            Misioneros
                            <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </li>
                }
            />

            {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">{errors.general}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <ComponentCard>
                    <div className="space-y-6 px-2 mt-8">
                        <label className="block text-sm font-medium">Familia <span className="text-error-500">*</span></label>
                        <input
                            value={familyName}
                            onChange={(e) => validateFamilyName(e.target.value)}
                            className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm ${errors.familyName ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.familyName && <p className="text-xs text-red-600">{errors.familyName}</p>}

                        <div className="flex gap-6 mt-6">
                            <div className="w-full">
                                <label className="block text-sm font-medium">Nombre de contacto <span className="text-error-500">*</span></label>
                                <input
                                    value={contactName}
                                    onChange={(e) => validateContactName(e.target.value)}
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm ${errors.contactName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.contactName && <p className="text-xs text-red-600">{errors.contactName}</p>}
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium">Correo electrónico <span className="text-error-500">*</span></label>
                                <input
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e) => validateContactEmail(e.target.value)}
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm ${errors.contactEmail ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.contactEmail && <p className="text-xs text-red-600">{errors.contactEmail}</p>}
                            </div>
                        </div>

                        <label className="mt-6 block text-sm font-medium">Descripción <span className="text-error-500">*</span></label>
                        <TextArea value={description} onChange={validateDescription} rows={4} className={errors.description ? "border-red-500" : ""} />
                        {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
                    </div>
                </ComponentCard>

                {/* Imagen */}
                <ComponentCard>
                    <label className="block text-sm font-medium mt-6">Invitación para oración</label>
                    <DropzoneComponent uploadFile={uploadFile} setUploadFile={(file) => validateImage(file)} />
                    {errors.imageFile && <p className="text-xs text-red-600">{errors.imageFile}</p>}

                    <div className="flex justify-end mt-6">
                        <Button variant="primary" onClick={handleAddOrUpdateEvent}>Guardar</Button>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}