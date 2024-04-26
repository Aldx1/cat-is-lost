import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";

interface IFileWithPreview extends File {
  preview: string;
}

interface IDropzoneProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

// Drop/Selector for images
const ImageDropzone = ({ files, setFiles }: IDropzoneProps) => {
  const [acceptedFiles, setAcceptedFiles] = useState<IFileWithPreview[]>([]);

  // react-dropzone callback function
  const onDrop = useCallback((newlyAcceptedFiles: File[]) => {
    if (newlyAcceptedFiles?.length) {
      setFiles([...files, ...newlyAcceptedFiles]);

      setAcceptedFiles((prevFiles) => [
        ...prevFiles,
        ...newlyAcceptedFiles.map((file) => ({
          ...file,
          name: file.name,
          preview: URL.createObjectURL(file),
        })),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  const removeFile = (fileToRemove: IFileWithPreview) => {
    URL.revokeObjectURL(fileToRemove.preview);
    setAcceptedFiles(acceptedFiles.filter((file) => file !== fileToRemove));
    const updatedFiles = files.filter((file) => file.name != fileToRemove.name);
    setFiles(updatedFiles);
  };

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          padding: "5px",
          borderRadius: "5px",
          textAlign: "center",
          border: isDragActive ? "1px dashed green" : "1px solid lightgrey",
        }}
      >
        <input {...getInputProps()} />
        <div>
          <i style={{ fontSize: "30px" }} className="bi bi-arrow-bar-up" />
          <p>Drag & drop images or click to select</p>
        </div>
      </div>

      <div className="accepted-files-div">
        {acceptedFiles.map((file) => (
          <div key={file.name} className="accepted-file-div shadow-lg m-1">
            <img
              src={file.preview}
              alt={file.name}
              width={"100%"}
              height={"100%"}
            />
            <Button
              variant="outline-danger"
              className="btn-close"
              onClick={() => removeFile(file)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageDropzone;
