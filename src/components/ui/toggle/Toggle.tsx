interface ToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ isActive, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!isActive)}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isActive ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
      <span className="sr-only">
        {isActive ? 'Desactivar' : 'Activar'} misionero
      </span>
    </button>
  );
}
