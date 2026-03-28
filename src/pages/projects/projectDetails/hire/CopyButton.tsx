import React, { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";

type CopyButtonProps = {
  value: string;
};

const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <>
      <button
        type='button'
        className='absolute right-3 top-10 text-input hover:text-gray-dark'
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy"}
        aria-label={copied ? "Copied" : "Copy value"}
      >
        <Copy className='w-4 h-4' />
      </button>
      {copied && (
        <span className='absolute right-9 top-10 text-[10px] font-bold text-input'>
          Copied!
        </span>
      )}
    </>
  );
};

export default CopyButton;
