import { useState } from 'react';
import emailService, { EmailCommunicationData } from '@/domain/services/EmailCommunication.service';

export type CommunicationType = 'prayletter' | 'newsletter';
export type ModalState = 'form' | 'loading' | 'success' | 'error';

export interface CommunicationConfig {
    type: CommunicationType;
    title: string;
    description: string;
    fileLabel: string;
    subjectPrefix: string;
    recipients: 'missionaries' | 'members';
}

export function useEmailCommunication(config: CommunicationConfig) {
    const [modalState, setModalState] = useState<ModalState>('form');

    const getDefaultSubject = () => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = today.toLocaleDateString('es-ES', options);
        return `${config.subjectPrefix} - ${dateString}`;
    };

    const sendCommunication = async (data: EmailCommunicationData) => {
        setModalState('loading');
        
        try {
            const result = config.type === 'prayletter' 
                ? await emailService.sendPrayLetter(data)
                : await emailService.sendNewsletter(data);

            if (result.success) {
                setModalState('success');
            } else {
                setModalState('error');
            }

            return result;
        } catch (error) {
            setModalState('error');
            return { success: false, message: 'Error inesperado' };
        }
    };

    const resetState = () => {
        setModalState('form');
    };

    return {
        modalState,
        getDefaultSubject,
        sendCommunication,
        resetState,
        config
    };
}
