import React, { useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { useFormikContext } from "formik";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export interface GalleryFormValues {
  gallery: UploadedFile[];
}

const Gallery: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { values, setFieldValue } = useFormikContext<GalleryFormValues>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));
      setFieldValue("gallery", [...(values.gallery || []), ...newFiles]);
    }
  };

  const removeImage = (id: string) => {
    setFieldValue(
      "gallery",
      (values.gallery || []).filter((img: UploadedFile) => img.id !== id)
    );
  };

  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <section>
        <h3 className='text-lg font-bold text-gray-900'>Gallery</h3>
        <p className='text-sm text-gray-500'>
          Showcase your best work to attract clients.
        </p>
      </section>

      {/* Main Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className='relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-12 bg-white hover:bg-gray-50 hover:border-purple-300 transition-all text-center'
      >
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          multiple
          accept='image/*'
          onChange={handleFileChange}
        />

        <div className='flex flex-col items-center gap-3'>
          <div className='p-4 bg-gray-50 rounded-full group-hover:bg-purple-50 transition-colors'>
            <UploadCloud className='w-8 h-8 text-gray-400 group-hover:text-purple-500' />
          </div>
          <div>
            <p className='text-sm font-bold text-gray-800'>
              Click to upload image
            </p>
            <p className='text-xs text-gray-400 mt-1'>
              PNG, JPG, GIF up to 10 MB
            </p>
          </div>
        </div>

        <p className='mt-8 text-[10px] text-gray-400'>
          Add at least one image to showcase your work
        </p>
      </div>

      {/* Uploaded Thumbnails Grid */}
      {values.gallery && values.gallery.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {values.gallery.map((img: UploadedFile) => (
            <div
              key={img.id}
              className='relative group aspect-video rounded-xl overflow-hidden border border-gray-100 bg-white p-1'
            >
              <img
                src={img.preview}
                alt='Upload preview'
                className='w-full h-full object-cover rounded-lg'
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                }}
                className='absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors'
              >
                <X size={14} />
              </button>
              <div className='absolute bottom-0 left-0 right-0 p-2 bg-white/90 backdrop-blur-sm'>
                <p className='text-[9px] text-gray-500 truncate font-medium'>
                  {img.file.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tip Box & Footer Buttons */}
      <div className='pt-10 space-y-6'>
        <div className='flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm'>
          <p className='text-[11px] text-gray-500 leading-relaxed flex-1'>
            <span className='font-bold text-gray-700'>Tip:</span> High-quality
            images significantly increase your chances of getting orders. Show
            your best and most relevant work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
