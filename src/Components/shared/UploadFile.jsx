// FileUpload.jsx
'use client'
import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { Controller } from 'react-hook-form'

export default function FileUpload({
  name,
  control,
  caption,
  accept = 'image/*',
  maxSize = 25 * 1024 * 1024, // 25MB default
  onFileSelect,
  disabled = false,
  error,
  rules,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <FileUploadContent
          value={value}
          onChange={onChange}
          caption={caption}
          accept={accept}
          maxSize={maxSize}
          onFileSelect={onFileSelect}
          disabled={disabled}
          error={error}
        />
      )}
    />
  )
}

function FileUploadContent({
  value,
  onChange,
  caption,
  accept,
  maxSize,
  onFileSelect,
  disabled,
  error,
}) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(
    value instanceof File ? value.name : null
  )

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      if (maxSize && file.size > maxSize) {
        alert(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)} MB`)
        return
      }

      setFileName(file.name)
      onChange(file)
      onFileSelect?.(file)
    } else {
      setFileName(null)
      onChange(null)
      onFileSelect?.(null)
    }
  }

  const handleClear = () => {
    setFileName(null)
    onChange(null)
    onFileSelect?.(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-[#FFC12D] rounded-[32px] p-10 flex flex-col items-center justify-center gap-4 bg-white hover:bg-yellow-50/30 transition-colors cursor-pointer group"
      >
        <div className="text-[#FFC12D] group-hover:scale-110 transition-transform">
          <UploadCloud size={64} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <p className="text-xl font-black text-[#1E293B]">
            {caption}
          </p>
          <p className="text-sm font-bold text-gray-400 mt-1">
            Max file size: {(maxSize / 1024 / 1024).toFixed(0)} MB
          </p>

          {fileName && (
            <p className="text-sm text-green-600 font-semibold mt-1">
              {fileName}
            </p>
          )}
        </div>

        <button
          type="button"
          className="mt-2 px-8 py-2 bg-[#FFC12D] text-white rounded-xl text-sm font-black shadow-lg shadow-yellow-200"
          disabled={disabled}
        >
          Browse Files
        </button>

        <input
          type="file"
          accept={accept}
          ref={inputRef}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {fileName && (
        <button
          type="button"
          onClick={handleClear}
          className="mt-3 text-sm font-bold text-red-500 hover:underline"
        >
          Clear file
        </button>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}
