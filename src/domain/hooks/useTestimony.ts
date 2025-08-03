import { useEffect, useState } from 'react';
import testimonyService from '@/domain/services/Testimony.service.ts';
import testimonyServiceMock from '@/domain/services/Testimony.service.mock.ts';
import { Testimony } from '@/domain/models/Testimony.ts';
import config from "@/domain/config";

const service = config.onTest ? testimonyServiceMock : testimonyService;

export function useTestimonies() {
    const [testimonies, setTestimonies] = useState<Testimony[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchTestimonies = async () => {
        setLoading(true);
        const data = await service.index();
        setTestimonies(data);
        setLoading(false);
    };

    const addTestimony = async (data: Partial<Testimony>) => {
        const newTestimony = await service.store(data);
        if (newTestimony) setTestimonies((prev) => [...prev, newTestimony]);
        return newTestimony
    };

    const updateTestimony = async (testimony: Partial<Testimony>, data: Partial<Testimony>) => {
        setLoading(true);
        try {
            const updated = await service.update(testimony, data);
            if (updated?.id) {
                setTestimonies(prev =>
                    prev.map((testimonyData) => testimonyData.id === updated.id
                        ? updated
                        : testimonyData
                    )
                );
            }
            return updated;
        } catch (error) {
            console.error("Error al actualizar el testimonio:", error);
            throw new Error("No se pudo actualizar el testimonio. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTestimony = async (id: number) => {
        const deleted = await service.remove(id);
        if (deleted) {
            setTestimonies((prev) =>
                prev.filter((testimony) => (testimony.id !== id))
            );
        }
        return deleted;
    };

    const storeOrUpdateTestimony = async (data: Partial<Testimony>|Testimony, testimony: Testimony|null) => {
        if(testimony) {
            return await updateTestimony(testimony, data);
        }

        return await addTestimony(data);
    }

    useEffect(() => { fetchTestimonies(); }, []);

    return {
        testimonies,
        loading,
        deleteTestimony,
        fetchTestimonies,
        addTestimony,
        updateTestimony,
        storeOrUpdateTestimony
    };
}