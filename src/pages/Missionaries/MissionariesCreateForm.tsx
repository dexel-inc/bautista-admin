import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import {Link} from "react-router";
import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import {useState} from "react";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Button from "../../components/ui/button/Button.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";

export default function MissionariesCreateForm() {
    const [familyName, setFamilyName] = useState("");
    const [description, setDescription] = useState("");
    const [contactName, setContactName] = useState("");
    const [location, setLocation] = useState("");
    const [uploadFile, setUploadFile] = useState<File|null>(
        null
    );

    const handleAddOrUpdateEvent = () => {
        resetModalFields();
    };

    const resetModalFields = () => {
        setFamilyName("");
        setContactName("");
        setLocation("");
        setDescription("");
        setUploadFile(null);
    };

    return (
    <>
      <PageMeta
        title="IBF - Añadir misionero"
        description="Familias que apoyan la iglesia bautista fundamental"
      />
        <PageBreadcrumb pageTitle="Añadir Misionero" others={
            <li className="text-sm self-center">
                <Link
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                    to="/missionaries"
                >
                    Misioneros
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
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Familia</label>
                                <input
                                    id="family"
                                    type="text"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="flex w-full justify-between gap-6 mt-6">
                                <div className="w-full">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Contacto
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="contactName"
                                            type="text"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Ubicación
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            id="location"
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
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
                        Invitación para oración
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
