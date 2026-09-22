interface PostImageGridProps {
  images: string[];
}

export function PostImageGrid({ images }: PostImageGridProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-3 overflow-hidden rounded-lg">
        <img src={images[0]} alt="" className="h-48 w-full object-cover sm:h-64" />
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
      {images.slice(0, 2).map((src, i) => (
        <img key={i} src={src} alt="" className="h-40 w-full object-cover sm:h-64" />
      ))}
    </div>
  );
}
