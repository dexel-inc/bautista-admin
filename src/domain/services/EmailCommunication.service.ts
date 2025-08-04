export interface EmailCommunicationData {
    subject: string;
    message?: string;
    attachmentFile: File;
    recipients: 'missionaries' | 'members';
}

export interface EmailCommunicationResult {
    success: boolean;
    message?: string;
}

class EmailCommunicationService {
    async sendPrayLetter(data: EmailCommunicationData): Promise<EmailCommunicationResult> {
        return this.sendCommunication(data, 'prayletter');
    }

    async sendNewsletter(data: EmailCommunicationData): Promise<EmailCommunicationResult> {
        return this.sendCommunication(data, 'newsletter');
    }

    private async sendCommunication(
        data: EmailCommunicationData, 
        type: 'prayletter' | 'newsletter'
    ): Promise<EmailCommunicationResult> {
        try {
            // Simulate API call
            console.log(`Enviando ${type} a ${data.recipients} con asunto: ${data.subject}`);
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.2) { // 80% success rate
                        resolve(true);
                    } else {
                        reject(new Error(`Error enviando ${type}`));
                    }
                }, 5000);
            });

            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}

export default new EmailCommunicationService();
