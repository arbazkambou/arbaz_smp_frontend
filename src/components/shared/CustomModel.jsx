import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function CustomModel({
  title,
  descrption,
  modelTrigger,
  children,
  openModel,
  setIsOpenModel,
  width = "30",
}) {
  const [open, setOpen] = useState(openModel === true ? true : false);

  useEffect(() => {
    setOpen(openModel);
  }, [openModel]);

  function handleChange(e) {
    if (e === true) {
      setIsOpenModel(true);
      setOpen(true);
    } else {
      setIsOpenModel(false);
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogTrigger asChild>{modelTrigger}</DialogTrigger>
      <DialogContent className={`max-w-[90%] sm:max-w-[80%]`}>
        {title && descrption && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{descrption}</DialogDescription>
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}
