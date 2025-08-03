import { useState, useEffect } from "react";
import { Modal } from "@/presentation/components/ui/modal";
import Button from "@/presentation/components/ui/button/Button.tsx";
import DropzoneComponent from "@/presentation/components/form/form-elements/DropZone.tsx";
import TextArea from "@/presentation/components/form/input/TextArea.tsx";
import { useEmailCommunication, CommunicationConfig } from "@/domain/hooks/useEmailCommunication";

interface EmailCommunicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: CommunicationConfig;
}

interface FormErrors {
    subject?: string;
    message?: string;
    attachmentFile?: string;
    general?: string;
}

export default function EmailCommunicationModal({ isOpen, onClose, config }: EmailCommunicationModalProps) {
    const { modalState, getDefaultSubject, sendCommunication, resetState } = useEmailCommunication(config);
    
    const [subject, setSubject] = useState(getDefaultSubject());
    const [message, setMessage] = useState('');
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    // Reset subject when config changes
    useEffect(() => {
        setSubject(getDefaultSubject());
    }, [config.type]);

    const validateSubject = (value: string) => {
        setSubject(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!value.trim()) {
            newErrors.subject = 'El asunto es requerido';
        } else if (value.length < 5) {
            newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
        } else if (value.length > 70) {
            newErrors.subject = 'El asunto no puede superar los 70 caracteres';
        } else {
            delete newErrors.subject;
        }

        setErrors(newErrors);
    };

    const validateMessage = (value: string) => {
        setMessage(value);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (value.trim() && value.length > 500) {
            newErrors.message = 'El mensaje no puede superar los 500 caracteres';
        } else {
            delete newErrors.message;
        }

        setErrors(newErrors);
    };

    const validateFile = (file: File | null) => {
        setAttachmentFile(file);
        const newErrors = { ...errors };
        delete newErrors.general;

        if (!file) {
            newErrors.attachmentFile = `El archivo ${config.fileLabel} es requerido`;
        } else if (file.type !== 'application/pdf') {
            newErrors.attachmentFile = 'Solo se permiten archivos PDF';
        } else if (file.size > 10 * 1024 * 1024) {
            newErrors.attachmentFile = 'El archivo no debe superar los 10MB';
        } else {
            delete newErrors.attachmentFile;
        }

        setErrors(newErrors);
    };

    const isFormValid = () => {
        return Object.keys(errors).length === 0 && 
               attachmentFile !== null && 
               subject.trim().length >= 5 && 
               subject.trim().length <= 70;
    };

    const handleSend = async () => {
        if (!isFormValid()) return;

        const result = await sendCommunication({
            subject: subject.trim(),
            message: message.trim(),
            attachmentFile: attachmentFile!,
            recipients: config.recipients
        });

        if (!result.success && result.message) {
            setErrors({ general: result.message });
        }
    };

    const handleRetry = () => {
        resetState();
        setErrors({});
    };

    const handleSuccess = () => {
        resetForm();
        resetState();
        onClose();
    };

    const resetForm = () => {
        setSubject(getDefaultSubject());
        setMessage('');
        setAttachmentFile(null);
        setErrors({});
    };

    const handleClose = () => {
        if (modalState === 'loading') return;
        
        resetForm();
        resetState();
        onClose();
    };

    const renderFormContent = () => (
        <>
            <div className="mb-6">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                    {config.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {config.description}
                </p>
            </div>

            {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                </div>
            )}

            <div className="space-y-6 dark:text-white text-gray-800">
                {/* Subject Field */}
                <div>
                    <label className="block text-sm font-medium dark:text-white mb-2">
                        Asunto <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={subject}
                        placeholder="Ingrese el asunto del correo"
                        onChange={(e) => validateSubject(e.target.value)}
                        className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 ${
                            errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <div>
                            {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
                        </div>
                        <p className={`text-xs ${
                            subject.length > 50 ? 'text-orange-500' : 'text-gray-500'
                        }`}>
                            {subject.length}/70 caracteres
                            {subject.length > 50 && (
                                <span className="ml-1 text-orange-500">
                                    (óptimo: ≤50)
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Message Field */}
                <div>
                    <label className="block text-sm font-medium dark:text-white mb-2">
                        Mensaje <span className="text-gray-500">(opcional)</span>
                    </label>
                    <TextArea
                        value={message}
                        onChange={validateMessage}
                        placeholder={`Escriba un breve mensaje que acompañará el ${config.fileLabel} (máximo 500 caracteres)`}
                        rows={4}
                        className={errors.message ? 'border-red-500' : ''}
                    />
                    <div className="flex justify-between items-center mt-1">
                        <div>
                            {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                        </div>
                        <p className="text-xs text-gray-500">
                            {message.length}/500 caracteres
                        </p>
                    </div>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium dark:text-white mb-2">
                        Archivo {config.fileLabel} (PDF) <span className="text-red-500">*</span>
                    </label>
                    <DropzoneComponent 
                        uploadFile={attachmentFile} 
                        setUploadFile={validateFile}
                        acceptedFileTypes={{
                            "application/pdf": [".pdf"]
                        }}
                        fileTypeLabel="PDF"
                    />
                    {errors.attachmentFile && <p className="mt-1 text-xs text-red-600">{errors.attachmentFile}</p>}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSend}
                    disabled={Object.keys(errors).length !== 0 || !attachmentFile}
                >
                    Enviar {config.fileLabel}
                </Button>
            </div>
        </>
    );

    const getModalContent = () => {
        switch (modalState) {
            case 'loading':
                return (
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
                                <svg className="animate-spin w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                                Enviando {config.fileLabel}...
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {config.description}
                            </p>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                                ¡{config.fileLabel} enviado exitosamente!
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {config.description}
                            </p>
                        </div>
                        <Button variant="primary" onClick={handleSuccess}>
                            Continuar
                        </Button>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-2">
                                Error al enviar {config.fileLabel}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Ocurrió un error al intentar enviar. Por favor, inténtalo nuevamente.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Button variant="outline" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleRetry}>
                                Reintentar
                            </Button>
                        </div>
                    </div>
                );
            default:
                return renderFormContent();
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            className="max-w-2xl mx-4 my-4 max-h-[90vh] overflow-hidden"
            showCloseButton={modalState !== 'loading'}
        >
            <div className="relative w-full h-full max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900">
                <div className="px-6 py-4">
                    {getModalContent()}
                </div>
            </div>
        </Modal>
    );
}
