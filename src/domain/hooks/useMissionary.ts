import { useEffect, useState } from 'react';
import missionaryService from '@/domain/services/Missionary.service.ts';
import missionaryServiceMock from '@/domain/services/Missionary.service.mock.ts';
import { Missionary } from '@/domain/models/Missionary.ts';
import config from "@/domain/config";

const service = config.onTest ? missionaryServiceMock : missionaryService;

export function useMissionaries() {
    const [missionaries, setMissionaries] = useState<Missionary[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchMissionaries = async () => {
        setLoading(true);
        const data = await service.index();
        setMissionaries(data);
        setLoading(false);
    };

    const addMissionary = async (data: Partial<Missionary>) => {
        setLoading(true);
        try {
            const newMissionary = await service.store(data);
            if (newMissionary) setMissionaries((prev) => [...prev, newMissionary]);
            setLoading(false);
            return newMissionary
        } catch (error) {throw new Error("No se pudo crear. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const updateMissionary = async (missionary: Partial<Missionary>, data: Partial<Missionary>) => {
        setLoading(true);
        try {
            const updated = await service.update(missionary, data);
            if (updated) {
                setMissionaries((prev) =>
                    prev.map((missionaryData) => (missionaryData.id === missionary.id ? updated : missionaryData))
                );
            }
            setLoading(false);

            return updated;
        } catch (error) {throw new Error("No se pudo actualizar. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }

    };

    const deleteMissionary = async (id: number) => {
        setLoading(true);
        const deleted = await service.remove(id);
        if (deleted) {
            setMissionaries((prev) =>
                prev.filter((missionary) => (missionary.id !== id))
            );
        }
        setLoading(false);

        return deleted;
    };

    const storeOrUpdateMissionary = async (data: Partial<Missionary>|Missionary, missionary?: Partial<Missionary>|null) => {
        if(missionary) {
            return await updateMissionary(missionary, data);
        }

        return await addMissionary(data);
    }

    useEffect(() => { fetchMissionaries(); }, []);

    return {
        missionaries,
        loading,
        deleteMissionary,
        fetchMissionaries,
        addMissionary,
        updateMissionary,
        storeOrUpdateMissionary
    };
}

export function useMissionary(missionaryId?: number) {
    const [missionary, setMissionary] = useState<null|Missionary>(null);
    const [loading, setLoading] = useState(true);


    const fetchMissionary = async () => {

        if(missionaryId) {
            setLoading(true);
            const data = await service.show(missionaryId);
            setMissionary(data);
            setLoading(false);
        }
    };

    useEffect(() => { fetchMissionary(); }, []);

    return {
        loading,
        missionary,
        fetchMissionary,
    };
}
