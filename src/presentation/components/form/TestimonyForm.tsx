import { useEffect, useState } from "react";
import Button from "@/presentation/components/ui/button/Button.tsx";
import TextArea from "@/presentation/components/form/input/TextArea.tsx";
import {Modal} from "@/presentation/components/ui/modal";
import {Testimony} from "@/domain/models/Testimony.ts";
import {useTestimoniesContext} from "@/presentation/context/TestimoniesContext.tsx";

interface FormErrors {
    name?: string | null;
    description?: string | null;
    imageFile?: string | null;
    general?: string | null;
}

interface TestimonyForm {
    isOpen: boolean;
    closeModal: () => void;
    testimony: Testimony|null
}


export default function TestimonyForm({isOpen, closeModal, testimony}: TestimonyForm) {
    const { storeOrUpdateTestimony } = useTestimoniesContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (testimony) {
            setName(testimony.name ?? '');
            setDescription(testimony.content ?? '');
        }
    }, [testimony]);

    useEffect(() => {
        setName(testimony?.name ?? '');
        setDescription(testimony?.content ?? '');
    }, [isOpen]);

    const validateName = (value: string) => {
        setName(value);
        let error = null;
        if (!value.trim()) {
            error = 'El nombre es requerido';
        } else if (value.length < 3) {
            error = 'El nombre debe tener al menos 3 caracteres';
        } else if (value.length > 100) {
            error = 'El nombre no puede superar los 100 caracteres';
        }
        setErrors(prev => ({ ...prev, name: error }));
        return { name: error };
    };

    const validateDescription = (value: string) => {
        setDescription(value);
        let error = null;
        if (!value.trim()) {
            error = 'La descripción es requerida';
        } else if (value.length < 10) {
            error = 'La descripción debe tener al menos 10 caracteres';
        } else if (value.length > 1000) {
            error = 'La descripción no puede superar los 1000 caracteres';
        }
        setErrors(prev => ({ ...prev, description: error }));
        return { description: error };
    };

    const formIsValid = (): boolean => {
        const nameError = validateName(name);
        const descriptionError = validateDescription(description);
        const hasErrors = !!nameError.name || !!descriptionError.description;
        return !hasErrors;
    };

    const handleAddOrUpdateEvent = async () => {
        if (!formIsValid()) return;

        const data = {
            name: name.trim(),
            content: description.trim(),
        };

        try {
            await storeOrUpdateTestimony(data, testimony);
            setName('');
            setDescription('');
            closeModal();
        } catch (error) {
            setName('');
            setDescription('');
            setErrors({ general: 'Ocurrió un error al guardar el testimonio' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md m-4 p-4 bg-white dark:bg-gray-900 dark:text-white">
            <div className="space-y-6">
                    {errors.general && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{errors.general}</p>
                        </div>
                    )}
                    {testimony ? "Editar " + testimony.name : "Añadir Testimonio"}
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
                                rows={6}
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <Button
                            disabled={!!errors.name || !!errors.description || !!errors.general}
                            variant="primary"
                            onClick={handleAddOrUpdateEvent}
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
        </Modal>
    );
}
