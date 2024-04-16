import FileService from '@/services/File';
import { useEffect, useState } from 'react';
import ImageCard from '../Cards/ImageCard';
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
        <div className='flex flex-col justify-center p-10 gap-5'>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className='p-0 md:mx-28 text-3xl text-bolder text-black'>Uploaded Files
                    </h1>
                    <div className='flex md:px-10 gap-5 flex-wrap md:mx-10 justify-center'>
                        {imageData?.map((image: any) => (
                            <ImageCard fileName={image.fileName} imageUrl={image.url} uploadedDate={image.uploadedDate} key={image.fileName} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageShower;
