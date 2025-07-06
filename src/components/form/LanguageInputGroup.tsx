import ComponentCard from '../common/ComponentCard';
import Label from './Label';
import Input from './input/InputField';
import TextArea from './input/TextArea';

interface FieldConfig<T extends Record<string, { es: string; en: string }>> {
  section: keyof T;
  spanishLabel: string;
  englishLabel: string;
  type?: 'input' | 'textarea';
  subtitle?: string;
}

interface LanguageInputGroupProps<T extends Record<string, { es: string; en: string }>> {
  title: string;
  fields: Array<FieldConfig<T>>;
  contentData: T;
  updateContent: (section: keyof T, language: 'es' | 'en', value: string) => void;
}

const LanguageInputGroup = <T extends Record<string, { es: string; en: string }>>({ 
  title,
  fields,
  contentData,
  updateContent
}: LanguageInputGroupProps<T>) => (
  <ComponentCard title={title}>
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={String(field.section)}>
          {field.subtitle && (
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {field.subtitle}
            </h4>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`${String(field.section)}-es`}>{field.spanishLabel}</Label>
              {field.type === 'textarea' ? (
                <TextArea
                  value={contentData[field.section].es}
                  onChange={(value: string) => updateContent(field.section, 'es', value)}
                  placeholder={`Ingrese ${field.spanishLabel.toLowerCase()}`}
                  rows={4}
                />
              ) : (
                <Input
                  id={`${String(field.section)}-es`}
                  type="text"
                  value={contentData[field.section].es}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContent(field.section, 'es', e.target.value)}
                  placeholder={`Ingrese ${field.spanishLabel.toLowerCase()}`}
                />
              )}
            </div>
            <div>
              <Label htmlFor={`${String(field.section)}-en`}>{field.englishLabel}</Label>
              {field.type === 'textarea' ? (
                <TextArea
                  value={contentData[field.section].en}
                  onChange={(value: string) => updateContent(field.section, 'en', value)}
                  placeholder={`Enter ${field.englishLabel.toLowerCase()}`}
                  rows={4}
                />
              ) : (
                <Input
                  id={`${String(field.section)}-en`}
                  type="text"
                  value={contentData[field.section].en}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContent(field.section, 'en', e.target.value)}
                  placeholder={`Enter ${field.englishLabel.toLowerCase()}`}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </ComponentCard>
);

export default LanguageInputGroup;
export type { FieldConfig, LanguageInputGroupProps };
