import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers
} from "@uploadthing/react";
 
export const { useUploadThing, uploadFiles } =
    generateReactHelpers<OurFileRouter>();

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();