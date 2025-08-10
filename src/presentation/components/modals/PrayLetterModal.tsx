import EmailCommunicationModal from "./EmailCommunicationModal";
import { CommunicationConfig } from "@/domain/hooks/useEmailCommunication";

interface PrayLetterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const prayLetterConfig: CommunicationConfig = {
    type: 'prayletter',
    title: 'Enviar PrayLetter',
    description: 'Envía una carta de oración a todos los miembros de la iglesia',
    fileLabel: 'PrayLetter',
    subjectPrefix: 'IBF Prayletter',
};

export default function PrayLetterModal({ isOpen, onClose }: PrayLetterModalProps) {
    return (
        <EmailCommunicationModal 
            isOpen={isOpen} 
            onClose={onClose} 
            config={prayLetterConfig}
        />
    );
}