import { useState } from "react";
import { Modal } from "@/presentation/components/ui/modal";
import Button from "@/presentation/components/ui/button/Button.tsx";
import DropzoneComponent from "@/presentation/components/form/form-elements/DropZone.tsx";
import { Missionary } from "@/domain/models/Missionary.ts";
import Select from "@/presentation/components/form/Select.tsx";
import prayLetterService from "@/domain/services/PrayLetter.service.ts";

interface MissionaryPrayLetterModalProps {
    isOpen: boolean;
    onClose: () => void;
    missionary: Missionary | null;
}

type PrayLetterType = 'link' | 'file';

interface FormErrors {
    type?: string;
    link?: string;
    file?: string;
    general?: string;
}

export default function MissionaryPrayLetterModal({ isOpen, onClose, missionary }: MissionaryPrayLetterModalProps) {
    const [type, setType] = useState<PrayLetterType>('link');
    const [link, setLink] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const typeOptions = [
        { value: 'link', label: 'Link' },
        { value: 'file', label: 'Archivo (PDF/Imagen)' },
    ];

    const validateLink = (value: string) => {
        setLink(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) {
            newErrors.link = 'El link es requerido';
        } else {
            try {
                new URL(value);
                delete newErrors.link;
            } catch {
                newErrors.link = 'Debe ser una URL válida';
            }
        }

        setErrors(newErrors);
    };

    const validateFile = (uploadedFile: File | null) => {
        setFile(uploadedFile);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!uploadedFile) {
            newErrors.file = 'El archivo es requerido';
        } else {
            const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif'
            ];
            
            if (!allowedTypes.includes(uploadedFile.type)) {
                newErrors.file = 'Solo se permiten archivos PDF o imágenes (JPG, PNG, GIF)';
            } else if (uploadedFile.size > 10 * 1024 * 1024) {
                newErrors.file = 'El archivo no debe superar los 10MB';
            } else {
                delete newErrors.file;
            }
        }

        setErrors(newErrors);
    };

    const isFormValid = () => {
        if (type === 'link') {
            return !errors.link && link.trim().length > 0;
        } else if (type === 'file') {
            return !errors.file && file !== null;
        }
        return false;
    };

    const handleSubmit = async () => {
        if (!isFormValid() || !missionary?.id) return;

        setIsLoading(true);
        
        try {
            const result = await prayLetterService.sendPrayLetter(missionary.id, {
                type,
                link: type === 'link' ? link : undefined,
                file: type === 'file' ? file || undefined : undefined,
            });

            if (result.success) {
                setIsLoading(false);
                setSuccess(true);
            } else {
                setErrors({ general: result.message || 'Error al actualizar el PrayLetter' });
                setIsLoading(false);
            }
        } catch (error) {
            setErrors({ general: 'Error al actualizar el PrayLetter' });
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setType('link');
        setLink('');
        setFile(null);
        setErrors({});
        setSuccess(false);
    };

    const handleClose = () => {
        if (isLoading) return;
        resetForm();
        onClose();
    };

    const handleSuccess = () => {
        resetForm();
        onClose();
    };

    const renderFormContent = () => (
        <>
            <div className="mb-6">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                    Actualizar carta de oración
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Actualiza la carta de oración para <strong>{missionary?.title}</strong>
                </p>
            </div>

            {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                </div>
            )}

            <div className="space-y-6 dark:text-white text-gray-800">
                {/* Type Select */}
                <div>
                    <label className="block text-sm font-medium dark:text-white mb-2">
                        Tipo <span className="text-red-500">*</span>
                    </label>
                    <Select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value as PrayLetterType);
                            setErrors({});
                            setLink('');
                            setFile(null);
                        }}
                        options={typeOptions}
                    />
                </div>

                {/* Link Input */}
                {type === 'link' && (
                    <div>
                        <label className="block text-sm font-medium dark:text-white mb-2">
                            Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            value={link}
                            placeholder="https://ejemplo.com"
                            onChange={(e) => validateLink(e.target.value)}
                            className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 ${
                                errors.link ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.link && <p className="mt-1 text-xs text-red-600">{errors.link}</p>}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Puedes incluir links de YouTube, Vimeo o cualquier otra URL
                        </p>
                    </div>
                )}

                {/* File Upload */}
                {type === 'file' && (
                    <div>
                        <label className="block text-sm font-medium dark:text-white mb-2">
                            Archivo (PDF o Imagen) <span className="text-red-500">*</span>
                        </label>
                        <DropzoneComponent 
                            uploadFile={file} 
                            setUploadFile={validateFile}
                            acceptedFileTypes={{
                                "application/pdf": [".pdf"],
                                "image/jpeg": [".jpg", ".jpeg"],
                                "image/png": [".png"],
                                "image/gif": [".gif"]
                            }}
                            fileTypeLabel="PDF o Imagen"
                        />
                        {errors.file && <p className="mt-1 text-xs text-red-600">{errors.file}</p>}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={!isFormValid() || Object.keys(errors).length > 0}
                >
                    Actualizar
                </Button>
            </div>
        </>
    );

    const renderLoadingState = () => (
        <div className="text-center py-12">
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
                    <svg className="animate-spin w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                    Actualizando Carta de Oración...
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Por favor espera un momento
                </p>
            </div>
        </div>
    );

    const renderSuccessState = () => (
        <div className="text-center py-12">
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                    ¡Carta de oración actualizada exitosamente!
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    La carta de oración de {missionary?.title} ha sido actualizada
                </p>
            </div>
            <Button variant="primary" onClick={handleSuccess}>
                Continuar
            </Button>
        </div>
    );

    const getModalContent = () => {
        if (isLoading) return renderLoadingState();
        if (success) return renderSuccessState();
        return renderFormContent();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            className="max-w-2xl mx-4 my-4 max-h-[90vh] overflow-hidden"
            showCloseButton={!isLoading}
        >
            <div className="relative w-full h-full max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
                <div className="px-6 py-4">
                    {getModalContent()}
                </div>
            </div>
        </Modal>
    );
}

