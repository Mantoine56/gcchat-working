'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  memo,
} from 'react';

import equal from 'fast-deep-equal';
// import { AnimatePresence, motion } from 'framer-motion'; // Removed unused framer-motion imports
import { Loader2 as LoaderIcon, X as XIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Using any here because tailwind-merge expects complex nested CSS class types
const clsx = (...args: unknown[]) => args.filter(Boolean).join(' ');

// Type Definitions
interface Attachment {
  url: string;
  name: string;
  contentType: string;
  size: number;
}

// UIMessage is no longer used in this file
/*
interface UIMessage {
  id: string;
  content: string;
  role: string;
  attachments?: Attachment[];
}
*/

// VisibilityType is no longer used in this file
/*
type VisibilityType = 'public' | 'private' | 'unlisted' | string;
*/

// Utility Functions
const cn = (...inputs: unknown[]) => {
  return twMerge(clsx(inputs));
};

// Button variants using cva - adapted for myGC assistant's theme
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary: gc-blue background, white text (instead of black)
        default: 'bg-gc-blue text-white hover:bg-gc-link',
        // Destructive: high-contrast gray outline, black text
        destructive:
          'border border-black text-black hover:bg-gray-100',
        // Outline: grayscale border, white background, black text
        outline:
          'border border-gray-400 bg-white hover:bg-gray-100 hover:text-black',
        // Secondary: grayscale background, gray text
        secondary:
          'bg-gray-200 text-black hover:bg-gray-300',
        // Ghost: hover effect, default text color (gc-nav)
        ghost: 'text-gc-nav hover:bg-gc-gray hover:text-gc-link', 
        // Link: gc-link text
        link: 'text-gc-link underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// Button component
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'button' : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

// Textarea component
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Adjusted to match myGC assistant colors
        'flex min-h-[80px] w-full rounded-md border border-gc-gray bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gc-nav focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gc-link focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-gc-nav',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

// Stop Icon SVG (uses currentColor)
const StopIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg height={size} viewBox="0 0 16 16" width={size} style={{ color: 'currentcolor' }}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3H13V13H3V3Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Paperclip Icon SVG (uses currentColor)
const PaperclipIcon = ({ size = 16 }: { size?: number }) => {
  return (
    <svg
      height={size}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size}
      style={{ color: 'currentcolor' }}
      className="-rotate-45"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8591 1.70735C10.3257 1.70735 9.81417 1.91925 9.437 2.29643L3.19455 8.53886C2.56246 9.17095 2.20735 10.0282 2.20735 10.9222C2.20735 11.8161 2.56246 12.6734 3.19455 13.3055C3.82665 13.9376 4.68395 14.2927 5.57786 14.2927C6.47178 14.2927 7.32908 13.9376 7.96117 13.3055L14.2036 7.06304L14.7038 6.56287L15.7041 7.56321L15.204 8.06337L8.96151 14.3058C8.06411 15.2032 6.84698 15.7074 5.57786 15.7074C4.30875 15.7074 3.09162 15.2032 2.19422 14.3058C1.29682 13.4084 0.792664 12.1913 0.792664 10.9222C0.792664 9.65305 1.29682 8.43592 2.19422 7.53852L8.43666 1.29609C9.07914 0.653606 9.95054 0.292664 10.8591 0.292664C11.7678 0.292664 12.6392 0.653606 13.2816 1.29609C13.9241 1.93857 14.2851 2.80997 14.2851 3.71857C14.2851 4.62718 13.9241 5.49858 13.2816 6.14106L13.2814 6.14133L7.0324 12.3835C7.03231 12.3836 7.03222 12.3837 7.03213 12.3838C6.64459 12.7712 6.11905 12.9888 5.57107 12.9888C5.02297 12.9888 4.49731 12.7711 4.10974 12.3835C3.72217 11.9959 3.50444 11.4703 3.50444 10.9222C3.50444 10.3741 3.72217 9.8484 4.10974 9.46084L4.11004 9.46054L9.877 3.70039L10.3775 3.20051L11.3772 4.20144L10.8767 4.70131L5.11008 10.4612C5.11005 10.4612 5.11003 10.4612 5.11 10.4613C4.98779 10.5835 4.91913 10.7493 4.91913 10.9222C4.91913 11.0951 4.98782 11.2609 5.11008 11.3832C5.23234 11.5054 5.39817 11.5741 5.57107 11.5741C5.74398 11.5741 5.9098 11.5054 6.03206 11.3832L6.03233 11.3829L12.2813 5.14072C12.2814 5.14063 12.2815 5.14054 12.2816 5.14045C12.6586 4.7633 12.8704 4.25185 12.8704 3.71857C12.8704 3.18516 12.6585 2.6736 12.2813 2.29643C11.9041 1.91925 11.3926 1.70735 10.8591 1.70735Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Arrow Up Icon SVG (Send) (uses currentColor)
const ArrowUpIcon = ({ size = 16 }: { size?: number }) => {
    return (
      <svg
        height={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width={size}
        style={{ color: 'currentcolor' }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
          fill="currentColor"
        />
      </svg>
    );
  };

// Sub-Components

const PreviewAttachment = ({
  attachment,
  isUploading = false,
}: {
  attachment: Attachment;
  isUploading?: boolean;
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div data-testid="input-attachment-preview" className="flex flex-col gap-1">
      <div className="w-20 h-16 aspect-video bg-gc-gray rounded-md relative flex flex-col items-center justify-center overflow-hidden border border-gc-gray">
        {contentType?.startsWith('image/') && url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={name ?? 'An image attachment'}
            className="rounded-md size-full object-cover grayscale"
          />
        ) : (
          <div className="flex items-center justify-center text-xs text-gc-nav text-center p-1">
             File: {name?.split('.').pop()?.toUpperCase() || 'Unknown'}
          </div>
        )}

        {isUploading && (
          <div
            data-testid="input-attachment-loader"
            className="animate-spin absolute text-gc-blue"
          >
            <LoaderIcon className="size-5" />
          </div>
        )}
      </div>
      <div className="text-xs text-gc-nav max-w-20 truncate">
        {name}
      </div>
    </div>
  );
};

function PureAttachmentsButton({
  fileInputRef,
  disabled,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  disabled: boolean;
}) {
  return (
    <Button
      data-testid="attachments-button"
      className="rounded-md rounded-bl-lg p-[7px] h-fit border border-gc-gray hover:bg-gc-gray"
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      disabled={disabled}
      variant="ghost"
      aria-label="Attach files"
    >
      <PaperclipIcon size={14} />
    </Button>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton, (prev, next) => prev.disabled === next.disabled);

function PureStopButton({ onStop }: { onStop: () => void }) {
  return (
    <Button
      data-testid="stop-button"
      // Using gc-blue background
      className="rounded-full p-1.5 h-fit border border-gc-blue text-white"
      onClick={(event) => {
        event.preventDefault();
        onStop();
      }}
      aria-label="Stop generating"
    >
      <StopIcon size={14} />
    </Button>
  );
}

const StopButton = memo(PureStopButton, (prev, next) => prev.onStop === next.onStop);

function PureSendButton({
  submitForm,
  input,
  uploadQueue,
  attachments,
  canSend,
  isGenerating,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
  attachments: Array<Attachment>;
  canSend: boolean;
  isGenerating: boolean;
}) {
  const isDisabled =
    uploadQueue.length > 0 ||
    !canSend ||
    isGenerating ||
    (input.trim().length === 0 && attachments.length === 0);

  return (
    <Button
      data-testid="send-button"
      // Uses gc-blue background
      className="rounded-full p-1.5 h-fit"
      onClick={(event) => {
        event.preventDefault();
        if (!isDisabled) {
          submitForm();
        }
      }}
      disabled={isDisabled}
      aria-label="Send message"
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length) return false;
  if (prevProps.attachments.length !== nextProps.attachments.length) return false;
  if (prevProps.attachments.length > 0 && !equal(prevProps.attachments, nextProps.attachments)) return false;
  if (prevProps.canSend !== nextProps.canSend) return false;
  if (prevProps.isGenerating !== nextProps.isGenerating) return false;
  return true;
});


// Main Component

interface MultimodalInputProps {
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  onSendMessage: (params: { input: string; attachments: Attachment[] }) => void;
  onStopGenerating: () => void;
  isGenerating: boolean;
  canSend: boolean;
  className?: string;
  inputId?: string;
  chatId?: string;
  messages?: {id: string; content: string; role: string}[];
  selectedVisibilityType?: string;
}

function PureMultimodalInput({
  attachments,
  setAttachments,
  onSendMessage,
  onStopGenerating,
  isGenerating,
  canSend,
  className,
  inputId,
  chatId,
  messages,
  selectedVisibilityType,
}: MultimodalInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Adjust textarea height dynamically
  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  // Effect to adjust height on input change
  useEffect(() => {
    adjustHeight();
  }, [input]);

  // Handle text input changes
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  // Placeholder File Upload Function
  const uploadFile = async (file: File): Promise<Attachment | undefined> => {
    console.log(`MOCK: Simulating upload for file: ${file.name}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          // Use URL.createObjectURL for client-side preview. Remember to revoke!
          const mockUrl = URL.createObjectURL(file);
          const mockAttachment: Attachment = {
            url: mockUrl,
            name: file.name,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
          };
          console.log(`MOCK: Upload successful for ${file.name}`);
          resolve(mockAttachment);
        } catch (error) {
          console.error('MOCK: Failed to create object URL for preview:', error);
          resolve(undefined);
        } finally {
           // Remove file name from upload queue
           setUploadQueue(currentQueue => currentQueue.filter(name => name !== file.name));
        }
      }, 700); // Simulate delay
    });
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      // Add files to upload queue immediately by name
      setUploadQueue(currentQueue => [...currentQueue, ...files.map((file) => file.name)]);

      // Clear the file input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
      const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
      const invalidFiles = files.filter(file => file.size > MAX_FILE_SIZE);

      if (invalidFiles.length > 0) {
         console.warn(`Skipped ${invalidFiles.length} files larger than ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
         // Also remove invalid files from the upload queue
         setUploadQueue(currentQueue => currentQueue.filter(name => !invalidFiles.some(f => f.name === name)));
      }

      // Start uploads for valid files
      const uploadPromises = validFiles.map((file) => uploadFile(file));
      const uploadedAttachments = await Promise.all(uploadPromises);

      const successfullyUploadedAttachments = uploadedAttachments.filter(
        (attachment): attachment is Attachment => attachment !== undefined,
      );

      // Add successfully uploaded attachments to the main attachments list
      setAttachments((currentAttachments) => [
        ...currentAttachments,
        ...successfullyUploadedAttachments,
      ]);

    },
    [setAttachments],
  );

  const handleRemoveAttachment = useCallback(
    (attachmentToRemove: Attachment) => {
      // Revoke the object URL
      if (attachmentToRemove.url.startsWith('blob:')) {
         URL.revokeObjectURL(attachmentToRemove.url);
      }
      // Filter out the attachment
      setAttachments((currentAttachments) =>
        currentAttachments.filter(
          (attachment) => attachment.url !== attachmentToRemove.url || attachment.name !== attachmentToRemove.name
        )
      );
      // Focus the textarea
      inputRef.current?.focus();
    },
    [setAttachments, inputRef]
  );

  // Form submission handler
  const handleSubmit = () => {
    if (!canSend || (input.trim() === '' && attachments.length === 0)) return;
    onSendMessage({ input: input.trim(), attachments });
    setInput(''); // Clear input after sending
    setAttachments([]); // Clear attachments after sending
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'; // Reset height
    }
  };

  return (
    <div data-testid="chat-input-bar" className={cn(
      // Styles for the main input bar container - using myGC theme
      "flex flex-col gap-2 p-3 rounded-lg border border-gc-gray bg-white shadow-sm",
      className
    )}>
      {/* Attachments preview area - if attachments exist */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-gc-gray pb-2 mb-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative group">
                <PreviewAttachment attachment={attachment} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-[-8px] right-[-8px] h-5 w-5 rounded-full p-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveAttachment(attachment)}
                  aria-label={`Remove ${attachment.name}`}
                >
                   <XIcon className="size-3" />
                </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main input area with textarea and buttons */}
      <div className="flex items-end gap-2">
        {/* Attachments button */}
        <AttachmentsButton fileInputRef={fileInputRef} disabled={isGenerating} />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileChange}
          accept="image/*,application/pdf,.txt,.csv,.md"
        />

        {/* Textarea for input */}
        <Textarea
          id={inputId}
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();

              const canSubmit = canSend && !isGenerating && uploadQueue.length === 0 && (input.trim().length > 0 || attachments.length > 0);

              if (canSubmit) {
                handleSubmit();
              }
            }
          }}
          placeholder="Send a message..."
          rows={1}
          disabled={isGenerating}
          className="flex-1 resize-none overflow-y-hidden"
        />

        {/* Send or Stop button */}
        {isGenerating ? (
          <StopButton onStop={onStopGenerating} />
        ) : (
          <SendButton 
            submitForm={handleSubmit} 
            input={input} 
            uploadQueue={uploadQueue} 
            attachments={attachments} 
            canSend={canSend}
            isGenerating={isGenerating}
          />
        )}
      </div>
    </div>
  );
}

export { PureMultimodalInput }; 