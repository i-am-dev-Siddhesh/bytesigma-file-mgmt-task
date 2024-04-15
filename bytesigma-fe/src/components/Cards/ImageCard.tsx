import React from 'react';

interface ImageCardProps {
    imageUrl: string;
    fileName: string;
    uploadedDate: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, fileName, uploadedDate }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <img className="rounded-t-lg w-full" src={imageUrl} alt={fileName} />
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{fileName}</h5>
                    <span className="text-gray-700 dark:text-gray-400">{new Date(uploadedDate).toISOString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
