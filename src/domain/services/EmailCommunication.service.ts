import service from "@/domain/services/service.ts";

export interface EmailCommunicationData {
    subject: string;
    message?: string;
    attachmentFile: File;
}

export interface EmailCommunicationResult {
    success: boolean;
    message?: string;
}

const endpoints = {
    prayletter: '/api/pray-letters/send ',
    newsletter: '/api/newsletters/send '
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
            const formData = new FormData();
            formData.append('subject', data.subject ?? '');
            formData.append('description', data.message ?? '');
            formData.append('file', data.attachmentFile ?? null);

            const serviceResponse = await service.post(endpoints[type], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const response: EmailCommunicationResult = { success: serviceResponse.data.status.status === 'OK' };

            console.log(serviceResponse)
            if (!response.success) {
                response.message = 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.'
            }

            return response;
        } catch (error) {
            return {
                success: false, 
                message: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}

export default new EmailCommunicationService();
