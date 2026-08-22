import { useState } from "react";
import { Camera, CaretDown } from "@phosphor-icons/react";

interface ShowcaseComposerFormProps {
  userName: string;
  avatarUrl?: string;
  recentImages: string[];
  onPublish: (data: { text: string; imageUrl?: string }) => void;
}

export function ShowcaseComposerForm({
  userName,
  avatarUrl,
  recentImages,
  onPublish,
}: ShowcaseComposerFormProps) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-[#7800B3]">
            {userName.charAt(0)}
          </div>
        )}
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <CaretDown size={14} weight="bold" className="text-gray-400" aria-hidden="true" />
          </div>
          <p className="text-xs text-gray-400">Everyone</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you want to talk about?"
        rows={6}
        className="w-full resize-none border-none text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      />

      <div className="flex gap-2 overflow-x-auto pt-2">
        <button
          type="button"
          aria-label="Upload photo"
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100"
        >
          <Camera size={22} weight="regular" className="text-gray-500" aria-hidden="true" />
        </button>
        {recentImages.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedImage(src)}
            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
              selectedImage === src ? "border-[#7800B3]" : "border-transparent"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPublish({ text, imageUrl: selectedImage })}
        className="mt-2 w-full rounded-lg bg-[#7800B3] py-2.5 text-sm font-medium text-white hover:bg-[#5C0090] sm:w-auto sm:self-end sm:px-8"
      >
        Publish now
      </button>
    </div>
  );
}
