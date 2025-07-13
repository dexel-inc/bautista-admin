import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import LanguageInputGroup from "../../components/form/LanguageInputGroup";
import Button from "../..//components/ui/button/Button.tsx";

interface ContentData {
  [key: string]: { es: string; en: string };
  hero: { es: string; en: string };
  about: { es: string; en: string };
  testimony_message: { es: string; en: string };
  verse_reference: { es: string; en: string };
  verse_content: { es: string; en: string };
  radio: { es: string; en: string };
  support: { es: string; en: string };
  thanks: { es: string; en: string };
}

const HomePageEditor: React.FC = () => {
  const [contentData, setContentData] = useState<ContentData>({
    hero: { es: "", en: "" },
    about: { es: "", en: "" },
    testimony_message: { es: "", en: "" },
    verse_reference: { es: "", en: "" },
    verse_content: { es: "", en: "" },
    radio: { es: "", en: "" },
    support: { es: "", en: "" },
    thanks: { es: "", en: "" },
  });

  const updateContent = (
    section: keyof ContentData,
    language: "es" | "en",
    value: string
  ) => {
    setContentData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving content data:", contentData);
    // Aquí implementarías la lógica para enviar los datos al backend
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Home Page Content Editor" />

      <div className="space-y-6">
        <LanguageInputGroup
          title="Hero Principal"
          fields={[
            {
              section: "hero",
              spanishLabel: "Mensaje del Hero (Español)",
              englishLabel: "Hero Message (English)",
              type: "textarea",
            },
          ]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Sección Quiénes Somos"
          fields={[
            {
              section: "about",
              spanishLabel: "Descripción Quiénes Somos (Español)",
              englishLabel: "About Us Description (English)",
              type: "textarea",
            },
            {
              section: "about",
              spanishLabel: "Corto mensaje de bienvenida (Español)",
              englishLabel: "Short welcome message (English)",
              type: "input",
            },
          ]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Sección de testimonios"
          fields={[
            {
              section: "verse_reference",
              spanishLabel: "Referencia Bíblica (Español)",
              englishLabel: "Bible Reference (English)",
              type: "input",
            },
            {
              section: "verse_content",
              spanishLabel: "Contenido del Versículo (Español)",
              englishLabel: "Verse Content (English)",
              type: "textarea",
            },
          ]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Sección de Radio"
          fields={[
            {
              section: "radio",
              spanishLabel: "Descripción de Radio (Español)",
              englishLabel: "Radio Description (English)",
              type: "textarea",
            },
          ]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Apoyar el Ministerio"
          fields={[
            {
              section: "support",
              spanishLabel: "Descripción de Apoyo (Español)",
              englishLabel: "Support Description (English)",
              type: "textarea",
            },
            {
              section: "thanks",
              spanishLabel: "Mensaje de Agradecimiento (Español)",
              englishLabel: "Thank You Message (English)",
              type: "textarea",
            },
          ]}
          contentData={contentData}
          updateContent={updateContent}
        />

        {/* Botones de acción */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex gap-4 justify-end">
            <Button variant="primary" onClick={handleSave}> Guardar </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageEditor;
