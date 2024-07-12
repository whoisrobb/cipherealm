import { useDropzone } from "react-dropzone";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
 
export const MultiUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        )

        const updatedFiles = [...files, ...newFiles]
        setFiles(updatedFiles);
    }, [files]);
  
    const onSubmit = async (files: File[]) => {
        console.log(files);
    };

    const removeItem = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }
 
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
 
  return (
    <>        
        <div className="w-full">
            <div {...getRootProps()} className="cursor-pointer border-2 border-dashed rounded-lg h-48 w-full grid place-items-center">
                <input {...getInputProps()} />
                <div className="grid place-items-center gap-y-4">
                    <div className="border border-dashed rounded-full h-12 w-12 grid place-items-center">
                        <UploadIcon />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">Drag & drop some files here &lsquo or click to select files</p>
                        <p className="text-sm text-muted-foreground">You can upload up to 8 files (max 4mb each)</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4 m-4 max-h-80 overflow-scroll">
                {files.map((file, index) => (
                    <FileComponent
                        key={index}
                        file={file}
                        index={index}
                        removeItem={removeItem}
                    />
                ))}
            </div>
            {/* {files.length > 0 && <Button 
                disabled={isSubmitting}
                onClick={() => onSubmit(files)}
            >
                Continue
            </Button>} */}
        </div>
    </>
  );
}

const FileComponent = ({ file, index, removeItem }: { file: File, index: number, removeItem: (to: number) => void }) => {
    return (
        <div className="flex gap-4 justify-between">
            <Image
                src={`/${file.name}`}
                alt={file.name}
                width={48}
                height={48}
                loading="lazy"
                className="aspect-square shrink-0 rounded-md object-cover"
            />
            <div className="">
                <p className="">{file.name}</p>
                <p className="text-sm text-muted-foreground">{Math.floor(file.size / 1024)} KB</p>
            </div>
            <Button
                variant={"outline"}
                size={"icon"}
                className="size-6"
                onClick={() => removeItem(index)}
            >
                <Cross2Icon />
            </Button>
        </div>
    )
}