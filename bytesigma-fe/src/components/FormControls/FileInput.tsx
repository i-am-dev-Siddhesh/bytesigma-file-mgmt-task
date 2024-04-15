import React, { useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  label: string;
  setFile: (val: File | null) => void;
  file: any;
}

const FileInput: React.FC<FileInputProps> = ({
  file,
  name,
  label,
  setFile,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('none'); // Default filter
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setPreviewImage(null);
    }
  };

  const applyFilter = (e: any) => {
    e.preventDefault();
    if (previewImage) {
      const image = new Image();
      image.src = previewImage;
      image.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            context.filter = filter;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const filteredImageData = canvas.toDataURL();
            // Convert filtered image data to file object
            const filteredFile = dataURLtoFile(
              filteredImageData,
              'filtered_image.png'
            );
            setFile(filteredFile);
            setPreviewImage(filteredImageData);
          }
        }
      };
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  // Function to convert data URL to file object
  const dataURLtoFile = (dataURL: string, fileName: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="file"
        id={name}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleFileChange}
      />
      {previewImage && file && (
        <div className="flex items-center mt-4">
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: 200, height: 200, objectFit: 'cover' }}
          />
          <div className="ml-4 gap-2 flex flex-col">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="text-gray-700 border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value="none">None</option>
              <option value="grayscale(100%)">Grayscale</option>
              <option value="sepia(100%)">Sepia</option>
            </select>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button
              onClick={applyFilter}
              className="bg-black px py-2 rounded-md"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
