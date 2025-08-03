import {useDropzone} from "react-dropzone";
import { useState, useEffect } from "react";

interface DropzoneProps {
  uploadFile: File|null;
  setUploadFile: (acceptedFile: File|null) => void;
  acceptedFileTypes?: Record<string, string[]>;
  fileTypeLabel?: string;
}

export default function DropZone({
  uploadFile, 
  setUploadFile, 
  acceptedFileTypes = {
    "image/png": [],
    "image/jpeg": [],
    "image/webp": [],
    "image/svg+xml": [],
  },
  fileTypeLabel = "imagen"
}: DropzoneProps) {
  const [imagePreview, setImagePreview] = useState<string>('');

  const isImageFile = uploadFile && uploadFile.type.startsWith('image/');
  const isPdfFile = uploadFile && uploadFile.type === 'application/pdf';

  useEffect(() => {
    if (uploadFile && isImageFile) {
      const url = URL.createObjectURL(uploadFile);
      console.log(`Creating preview URL for ${uploadFile.name}:`, url);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(url);
    } else {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview('');
    }
  }, [uploadFile]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Solo tomar el primer archivo
    setUploadFile(file);
    console.log("File dropped:", file);
  };

  const removeFile = () => {
    setUploadFile(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    maxFiles: 1,
  });

  return (
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
          ${
                isDragActive
                    ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                    : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }
        `}
            id="demo-upload"
        >
          {!uploadFile ? (
              <input {...getInputProps()} />
          ) : null}

          <div className="dz-message flex flex-col items-center m-0!">
            {/* Mostrar vista previa de archivo si hay archivo */}
            {uploadFile ? (
                <div className="w-full max-w-md">
                  <div className="relative group mb-6">
                    <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      {isImageFile && imagePreview ? (
                          <img
                              src={imagePreview}
                              alt={`Preview ${uploadFile.name}`}
                              className="w-full h-full object-contain transition-transform group-hover:scale-105"
                              onLoad={() => {
                                console.log(`Image loaded successfully`);
                                console.log(`Image src: ${imagePreview}`);
                              }}
                              onError={(e) => {
                                console.error(`Error loading image:`, e);
                                console.error(`Failed src: ${imagePreview}`);
                              }}
                          />
                      ) : isPdfFile ? (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 dark:text-gray-300">
                            <div className="text-center">
                              <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                              </svg>
                              <p className="font-medium break-all text-sm px-2">
                                {uploadFile.name}
                              </p>
                              <p className="text-xs opacity-75 mt-1">
                                {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                      )}
                    </div>

                    <div className="absolute inset-0 group-hover:bg-black/50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                        <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 mb-2 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        {!isPdfFile && (
                          <>
                            <p className="text-white text-xs font-medium break-all px-2">
                              {uploadFile.name}
                            </p>
                            <p className="text-white text-xs opacity-75">
                              {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <>
                  <div className="mb-[22px] flex justify-center">
                    <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      {fileTypeLabel === "PDF" ? (
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      ) : (
                        <svg
                            className="fill-current"
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </>
            )}

            {!uploadFile ? (
                <>
                  <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                    Arrastra y suelta tu {fileTypeLabel} aquí
                  </h4>
                  <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                    {fileTypeLabel === "PDF" ? 
                      "Arrastra y suelta tu archivo PDF aquí o navega" :
                      "Arrastra y suelta tu imagen PNG, JPG, WebP o SVG aquí o navega"
                    }
                  </span>
                  <span className="font-medium underline text-theme-sm text-brand-500">
                    Explorar archivo
                  </span>
                </>
            ) : null}
          </div>
        </form>
      </div>
  );
};