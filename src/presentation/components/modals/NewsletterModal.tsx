import EmailCommunicationModal from "./EmailCommunicationModal";
import { CommunicationConfig } from "@/domain/hooks/useEmailCommunication";

interface PrayLetterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const newsLetterConfig: CommunicationConfig = {
    type: 'newsletter',
    title: 'Enviar newsLetter',
    description: 'Envía un mensaje a todos los miembros de la iglesia',
    fileLabel: 'NewsLetter',
    subjectPrefix: 'IBF Newsletter',
};

export default function NewsletterModal({ isOpen, onClose }: PrayLetterModalProps) {
    return (
        <EmailCommunicationModal 
            isOpen={isOpen} 
            onClose={onClose} 
            config={newsLetterConfig}
        />
    );
}