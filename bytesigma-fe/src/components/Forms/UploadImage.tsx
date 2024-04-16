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

    const onSubmit = async (e:any) => {
        try {
            e.preventDefault()
            if (files?.filter((file) => file ? true : false)?.length === 0) {
                throw new Error("Please select files first!")
            }
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
        <form className="mx-36 py-5 w-full">
            <h1 className='p-0 mb-2  text-3xl text-bolder text-black'>Upload Files</h1>
            {files &&
                files.map((file, index) => (
                    <div key={index} className="mb-4 flex gap-4">
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
                            className="bg-red-500 max-h-[100px] text-white-500 mt-6 px-4 rounded-lg "
                            onClick={() => handleRemoveFile(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            <div className='flex gap-2 w-full'>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg "
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
            </div>

        </form>
    );
};

export default UploadImagesForm;
