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
        const newMissionary = await service.store(data);
        if (newMissionary) setMissionaries((prev) => [...prev, newMissionary]);
        return newMissionary
    };

    const updateMissionary = async (missionary: Partial<Missionary>, data: Partial<Missionary>) => {
        const updated = await service.update(missionary, data);
        if (updated) {
            setMissionaries((prev) =>
                prev.map((missionary) => (missionary.id === missionary.id ? updated : missionary))
            );
        }
        return updated;
    };

    const deleteMissionary = async (id: number) => {
        const deleted = await service.remove(id);
        if (deleted) {
            setMissionaries((prev) =>
                prev.filter((missionary) => (missionary.id !== id))
            );
        }
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
