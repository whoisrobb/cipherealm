import { Dialog, DialogHeader, DialogDescription, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

type DropdownDialog = {
    title: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

const DropdownDialog = ({ title, children, isOpen, setIsOpen }: DropdownDialog) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                {children}
            </DialogDescription>
        </DialogContent>
    </Dialog>
  )
}

export default DropdownDialog