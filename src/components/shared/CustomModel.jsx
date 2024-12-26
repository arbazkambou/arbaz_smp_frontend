import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export function CustomModel({
  title,
  descrption,
  modelTrigger,
  modelCloser,
  children,
  openModel,
  setIsOpenModel,
}) {
  return (
    <Dialog open={openModel} onOpenChange={setIsOpenModel}>
      <DialogTrigger asChild>{modelTrigger}</DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-[60%]">
        {title && descrption && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{descrption}</DialogDescription>
          </DialogHeader>
        )}

        {children}
        <DialogFooter>
          <DialogClose asChild>{modelCloser}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
