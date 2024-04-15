import FileService from '@/services/File';
import { useState } from 'react';
import FileInput from '../FormControls/FileInput'; // Assuming FileInput is in the same directory

const UploadImagesForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('images', file as File);
            const resp = await FileService.createImages(formData);
            setFile(null);
        } catch (error: any) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form>
            <FileInput setFile={setFile} name="image" label="Upload Image" />
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
