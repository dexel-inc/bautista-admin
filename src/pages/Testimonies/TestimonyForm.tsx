import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import {Link, useNavigate, useParams} from "react-router";
import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import {useEffect, useState} from "react";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Button from "../../components/ui/button/Button.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";
import {useTestimonies, useTestimony} from "@/hooks/useTestimony.ts";

export default function TestimonyForm() {
    const {testimonyId} = useParams();
    const { testimony } = useTestimony(parseInt(testimonyId ?? ''));
    const { storeOrUpdateTestimony } = useTestimonies();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uploadFile, setUploadFile] = useState<File|null>(
        null
    );

    const navigate = useNavigate();

    useEffect(() => {
        if(testimony) {
            setName(testimony.name ?? '')
            setDescription(testimony.description ?? '')
        }
    }, [testimony]);

    const handleAddOrUpdateEvent = async () => {
        let data = {
            name: name ?? '',
            description: description ?? '',
            img: uploadFile ? URL.createObjectURL(uploadFile) : '',
        };

        await storeOrUpdateTestimony(data, testimony?.id);

        navigate(`/testimonies`)
    };

    return (
    <>
      <PageMeta
        title="IBF - Añadir testimonio"
        description="Compartir un testimonio para la iglesia bautista fundamental"
      />
        <PageBreadcrumb pageTitle={testimony ? "Editar " + testimony.name : "Añadir Testimonio"} others={
            <li className="text-sm self-center">
                <Link
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                    to="/testimonies"
                >
                    Testimonios
                    <svg
                        className="stroke-current"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                            stroke=""
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </li>
        }>
        </PageBreadcrumb>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <ComponentCard>
                <div className="space-y-6">
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div className="mt-8">
                            <div className="w-full">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    placeholder={`Ingrese el nombre`}
                                    onChange={(e) => setName(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="flex w-full justify-between gap-6">
                                <div className="mt-6 w-full">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Descripción
                                    </label>
                                    <div className="w-full">
                                        <TextArea
                                            value={description}
                                            onChange={setDescription}
                                            placeholder={`Ingrese la descripción`}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentCard>
            <ComponentCard>
                <div className="mt-6">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Imagen del testimonio
                    </label>
                    <div className="relative">
                        <DropzoneComponent uploadFile={uploadFile} setUploadFile={setUploadFile} />
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                    <Button variant="primary" onClick={handleAddOrUpdateEvent}> Guardar </Button>
                </div>
            </ComponentCard>
        </div>
    </>
  );
}
