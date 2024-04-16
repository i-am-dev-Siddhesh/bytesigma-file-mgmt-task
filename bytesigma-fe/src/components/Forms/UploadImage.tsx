import FileService from '@/services/File';
import { useState } from 'react';
import FileInput from '../FormControls/FileInput'; 
import { toast } from 'react-toastify';
import { errorFormatter } from '@/utils';

const UploadImagesForm = () => {
    const [files, setFiles] = useState<File[] | null>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddFile = () => {
        const newFiles: any = files ? [...files] : [];
        newFiles.push(null);
        setFiles(newFiles);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = files ? [...files] : [];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const formData = new FormData();
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i]) {
                        formData.append('images', files[i]);
                    }
                }
            }
            await FileService.createImages(formData);
            setFiles([]);
            toast.success("Added");
        } catch (error: any) {
            const message = errorFormatter(error);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mx-auto max-w-[320px]">
            {files &&
                files.map((file, index) => (
                    <div key={index} className="mb-4">
                        <FileInput
                            setFile={(newFile) => {
                                const newFiles: any = files ? [...files] : [];
                                newFiles[index] = newFile;
                                setFiles(newFiles);
                            }}
                            file={file}
                            name={`image_${index}`}
                            label={`Upload Image ${index + 1}`}
                        />
                        <button
                            type="button"
                            className="text-red-500 mt-2"
                            onClick={() => handleRemoveFile(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
                onClick={handleAddFile}
            >
                Add File
            </button>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
                type="submit"
                disabled={isLoading}
                className={`bg-green-500 text-white py-2 px-4 rounded-lg ${isLoading && 'opacity-50 cursor-not-allowed'
                    }`}
                onClick={onSubmit}
            >
                {isLoading ? 'Uploading...' : 'Submit'}
            </button>
        </form>
    );
};

export default UploadImagesForm;
