import service from "@/domain/services/service.ts";

export interface PrayLetterData {
    type: 'link' | 'file';
    link?: string;
    file?: File;
}

export interface PrayLetterResult {
    success: boolean;
    message?: string;
}

class PrayLetterService {
    async sendPrayLetter(missionaryId: number, data: PrayLetterData): Promise<PrayLetterResult> {
        try {
            const formData = new FormData();
            formData.append('type', data.type);
            
            if (data.type === 'link' && data.link) {
                formData.append('link', data.link);
            }
            
            if (data.type === 'file' && data.file) {
                formData.append('file', data.file);
            }

            const serviceResponse = await service.post(
                `/api/pray-letters/send/${missionaryId}`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const response: PrayLetterResult = { 
                success: serviceResponse.data?.status?.status === 'OK'
            };

            if (!response.success) {
                response.message = 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.';
            }

            return response;
        } catch (error) {
            return {
                success: false, 
                message: error instanceof Error ? error.message : 'Error al actualizar el PrayLetter'
            };
        }
    }
}

export default new PrayLetterService();

