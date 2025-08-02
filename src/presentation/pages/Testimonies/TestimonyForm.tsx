import PageMeta from "@/presentation/components/common/PageMeta.tsx";
import PageBreadcrumb from "@/presentation/components/common/PageBreadCrumb.tsx";
import { Link, useNavigate, useParams } from "react-router";
import DropzoneComponent from "@/presentation/components/form/form-elements/DropZone.tsx";
import { useEffect, useState } from "react";
import ComponentCard from "@/presentation/components/common/ComponentCard.tsx";
import Button from "@/presentation/components/ui/button/Button.tsx";
import TextArea from "@/presentation/components/form/input/TextArea.tsx";
import { useTestimonies, useTestimony } from "@/domain/hooks/useTestimony.ts";

interface FormErrors {
    name?: string | null;
    description?: string | null;
    imageFile?: string | null;
    general?: string | null;
}

export default function TestimonyForm() {
    const { testimonyId } = useParams();
    const { testimony } = useTestimony(parseInt(testimonyId ?? ''));
    const { storeOrUpdateTestimony } = useTestimonies();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    const navigate = useNavigate();

    useEffect(() => {
        if (testimony) {
            setName(testimony.name ?? '');
            setDescription(testimony.content ?? '');
        }
    }, [testimony]);

    const validateName = (value: string) => {
        setName(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (value.length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        } else if (value.length > 100) {
            newErrors.name = 'El nombre no puede superar los 100 caracteres';
        } else {
            delete newErrors.name;
        }

        setErrors(newErrors);
        return newErrors;
    };

    const validateDescription = (value: string) => {
        setDescription(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) {
            newErrors.description = 'La descripción es requerida';
        } else if (value.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres';
        } else {
            delete newErrors.description;
        }

        setErrors(newErrors);
        return newErrors;
    };

    const validateImage = (file: File | null) => {
        setUploadFile(file);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!file && !testimony) { // solo obligatorio en creación
            newErrors.imageFile = 'La imagen es requerida';
        } else if (file && file.size > 2 * 1024 * 1024) {
            newErrors.imageFile = 'La imagen no debe superar los 2MB';
        } else {
            delete newErrors.imageFile;
        }

        setErrors(newErrors);
        return newErrors;
    };

    const formIsValid = (): boolean => {
        validateName(name);
        validateDescription(description);
        validateImage(uploadFile);
        return Object.keys(errors).length === 0;
    };

    const handleAddOrUpdateEvent = async () => {
        if (!formIsValid()) return;

        const data = {
            name: name.trim(),
            content: description.trim(),
            imageFile: uploadFile ?? null,
        };

        try {
            await storeOrUpdateTestimony(data, testimony);
            navigate(`/testimonies`);
        } catch (error) {
            setErrors({ general: 'Ocurrió un error al guardar el testimonio' });
        }
    };

    return (
        <>
            <PageMeta
                title="IBF - Añadir testimonio"
                description="Compartir un testimonio para la iglesia bautista fundamental"
            />

            <PageBreadcrumb
                pageTitle={testimony ? "Editar " + testimony.name : "Añadir Testimonio"}
                others={
                    <li className="text-sm self-center">
                        <Link className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/testimonies">
                            Testimonios
                            <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </li>
                }
            />

            {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <ComponentCard>
                    <div className="space-y-6">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div className="mt-8">
                                <label className="mb-1.5 block text-sm font-medium dark:text-white">Nombre <span className="text-error-500">*</span></label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    placeholder="Ingrese el nombre"
                                    onChange={(e) => validateName(e.target.value)}
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}

                                <label className="mt-6 mb-1.5 block text-sm font-medium dark:text-white">Descripción <span className="text-error-500">*</span></label>
                                <TextArea
                                    value={description}
                                    onChange={validateDescription}
                                    placeholder="Ingrese el testimonio"
                                    rows={4}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                            </div>
                        </div>
                    </div>
                </ComponentCard>

                <ComponentCard>
                    <div className="mt-6">
                        <label className="mb-1.5 block text-sm font-medium dark:text-white">Imagen del testimonio</label>
                        <DropzoneComponent uploadFile={uploadFile} setUploadFile={(file) => validateImage(file)} />
                        {errors.imageFile && <p className="mt-1 text-xs text-red-600">{errors.imageFile}</p>}
                    </div>

                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <Button disabled={Object.keys(errors).length !== 0}  variant="primary" onClick={handleAddOrUpdateEvent}>Guardar</Button>
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}
