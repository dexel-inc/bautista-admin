import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import LanguageInputGroup from '../../components/form/LanguageInputGroup';

interface AboutUsContentData {
  mission: { es: string; en: string };
  vision: { es: string; en: string };
  history: { es: string; en: string };
  team: { es: string; en: string };
  values: { es: string; en: string };
  [key: string]: { es: string; en: string };
}

const AboutUsEditor: React.FC = () => {
  const [contentData, setContentData] = useState<AboutUsContentData>({
    mission: { es: '', en: '' },
    vision: { es: '', en: '' },
    history: { es: '', en: '' },
    team: { es: '', en: '' },
    values: { es: '', en: '' },
  });

  const updateContent = (section: keyof AboutUsContentData, language: 'es' | 'en', value: string) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving about us content data:', contentData);
    // Aquí implementarías la lógica para enviar los datos al backend
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="About Us Content Editor" />
      
      <div className="space-y-6">
        <LanguageInputGroup
          title="Misión"
          fields={[{
            section: "mission",
            spanishLabel: "Misión de la Organización (Español)",
            englishLabel: "Organization Mission (English)",
            type: "textarea"
          }]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Visión"
          fields={[{
            section: "vision",
            spanishLabel: "Visión de la Organización (Español)",
            englishLabel: "Organization Vision (English)",
            type: "textarea"
          }]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Historia"
          fields={[{
            section: "history",
            spanishLabel: "Historia de la Organización (Español)",
            englishLabel: "Organization History (English)",
            type: "textarea"
          }]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Equipo"
          fields={[{
            section: "team",
            spanishLabel: "Información del Equipo (Español)",
            englishLabel: "Team Information (English)",
            type: "textarea"
          }]}
          contentData={contentData}
          updateContent={updateContent}
        />

        <LanguageInputGroup
          title="Valores"
          fields={[{
            section: "values",
            spanishLabel: "Valores de la Organización (Español)",
            englishLabel: "Organization Values (English)",
            type: "textarea"
          }]}
          contentData={contentData}
          updateContent={updateContent}
        />

        {/* Botones de acción */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex gap-4 justify-end">
              <button
                  onClick={handleSave}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 lg:inline-flex lg:w-auto">
                  Guardar Cambios
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsEditor;
