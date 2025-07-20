import React from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, File, Image, FileText, Paperclip } from 'lucide-react';
import { Button } from './button';

const FileUpload = ({ 
  className,
  multiple = false,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFilesSelected,
  onFileRemove,
  files = [],
  disabled = false,
  ...props 
}) => {
  const inputRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.includes('pdf') || file.type.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFiles = (fileList) => {
    const validFiles = [];
    const newErrors = [];

    Array.from(fileList).forEach(file => {
      if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`);
      } else if (accept && !file.type.match(accept)) {
        newErrors.push(`${file.name} is not an accepted file type`);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);
    return validFiles;
  };

  const handleFileSelect = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const validFiles = validateFiles(fileList);
      if (validFiles.length > 0 && onFilesSelected) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled) {
      const fileList = e.dataTransfer.files;
      const validFiles = validateFiles(fileList);
      if (validFiles.length > 0 && onFilesSelected) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleRemoveFile = (index) => {
    if (onFileRemove) {
      onFileRemove(index);
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            {accept ? `Accepted formats: ${accept}` : "All file types accepted"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const FileIcon = getFileIcon(file);
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30"
              >
                <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                {!disabled && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Simple file attachment component for inline use
const FileAttachment = ({ 
  onFileSelect, 
  accept, 
  multiple = true,
  className,
  children,
  ...props 
}) => {
  const inputRef = React.useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
      />
      <Button
        variant="outline"
        size="sm"
        className={cn("gap-2", className)}
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        <Paperclip className="h-4 w-4" />
        {children || "Attach files"}
      </Button>
    </>
  );
};

export { FileUpload, FileAttachment };