"use client";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MultiUploader, MyFileType } from "./custom-uploader";
import { FileResponse } from "@/lib/types/types";

const FileInput = ({ addFiles, triggerDialog }: { addFiles: (to: FileResponse[]) => void, triggerDialog: (to: boolean) => void }) => {
    return (
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Upload files</DialogTitle>
            <DialogDescription>
                <MultiUploader addFiles={addFiles} triggerDialog={triggerDialog} />
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}

export default FileInput;