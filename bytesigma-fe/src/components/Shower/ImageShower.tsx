import React, { useState, useEffect } from 'react';
import ImageCard from '../Cards/ImageCard';
import FileService from '@/services/File';
import Spinner from '../Spinner';

const ImageShower = () => {
    const [imageData, setImageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initial loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Set loading state to true before fetching
                const data = await FileService.fetchImages();
                setImageData(data?.data || []);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching (even on error)
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex p-10 gap-5 flex-wrap mx-10 justify-center'>
            {isLoading ? (
                <Spinner /> // Display spinner while loading
            ) : (
                imageData?.map((image: any) => (
                    <ImageCard fileName={image.fileName} imageUrl={image.url} uploadedDate={image.uploadedDate} key={image.fileName} />
                ))
            )}
        </div>
    );
};

export default ImageShower;
