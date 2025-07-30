import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label.tsx";
import Input from "../form/input/InputField.tsx";
import Button from "../ui/button/Button.tsx";
import { useAuth } from "@/domain/hooks/useAuth.ts";
import { useNavigate } from "react-router";

interface FormErrors {
  email?: string | null;
  password?: string | null;
  general?: string | null;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (formIsValid()) {
      const newErrors = { ...errors };
      try {
        const response = await login({
          email: email.trim(),
          password: password
        });

        if (response.success) {
          navigate("/", { replace: true });
          return;
        }

        newErrors.general = 'Credenciales incorrectas. Por favor verifica tu correo y contraseña.';
      } catch (error) {
        newErrors.general = 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.';
      }
      setErrors(newErrors);
    }
  }

  function validateEmail(emailValue: string) {
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = { ...errors };
    delete newErrors.general;

    if (!emailValue.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(emailValue)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    } else if (emailValue.length > 254) {
      newErrors.email = 'El correo electrónico es demasiado largo';
    } else {
      delete newErrors.email;
    }

    setErrors(newErrors);
    return newErrors;
  }

  const validatePassword = (passwordValue: string) => {
    setPassword(passwordValue);
    const newErrors = { ...errors };
    delete newErrors.general;

    if (!passwordValue) {
      newErrors.password = 'La contraseña es requerida';
    } else if (passwordValue.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (passwordValue.length > 255) {
      newErrors.password = 'La contraseña es demasiado larga';
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const formIsValid = (): boolean => {
    validateEmail(email);
    validatePassword(password);

    return Object.keys(errors).length === 0;
  };

  return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Iniciar sesión
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa tu usuario y contraseña para entrar a la consola administrativa
              </p>
            </div>

            {errors.general ? (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
            ) : ''}

            <div>
              <form onSubmit={(event) => {
                event.preventDefault();
                if (!isLoading) {
                  handleLogin();
                }
              }}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Correo Electrónico <span className="text-error-500">*</span>
                    </Label>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        placeholder="info@gmail.com"
                        disabled={isLoading}
                        className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                    )}
                  </div>
                  <div>
                    <Label>
                      Contraseña <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                          name='current-password'
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => validatePassword(e.target.value)}
                          disabled={isLoading}
                          className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
                          aria-invalid={!!errors.password}
                          aria-describedby={errors.password ? 'password-error' : undefined}
                          placeholder="Ingresa tu contraseña"
                      />
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                        <p id="password-error" className="mt-1 text-xs text-red-600">
                          {errors.password}
                        </p>
                    )}
                  </div>
                  <div>
                    <Button
                        disabled={isLoading || Object.keys(errors).length !== 0}
                        className="w-full"
                        size="sm"
                    >
                      {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}