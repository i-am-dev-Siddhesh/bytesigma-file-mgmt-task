import React from 'react';

interface ImageCardProps {
    imageUrl: string;
    fileName: string;
    uploadedDate: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, fileName, uploadedDate }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <img className="rounded-t-lg w-full" src={imageUrl} alt={fileName} />
            <div className="p-5">
                <div className="flex flex-col justify-between mb-3">
                    <h5 className="overflow-hidden whitespace-nowrap text-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">File Name: {fileName}</h5>
                    <span className="text-gray-700 dark:text-gray-400">
                        Uploaded Date: {new Date(uploadedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
