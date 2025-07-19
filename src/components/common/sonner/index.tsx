import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { IoIosWarning } from "react-icons/io";
import { IoInformationOutline } from "react-icons/io5";

export const toastSuccess = (message: string) => {
  const id = toast.success(
    <div className="relative w-75 pr-10">
      <div className="ml-2 text-txt-system-success">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-txt-system-success rounded-full"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none !p-3",
      duration: 5000,
      icon: (
        <div className="size-7 flex items-center justify-center bg-foreground-system-success rounded-lg">
          <div className="size-4 flex items-center justify-center bg-txt-system-success rounded-full">
            <Check className="text-white w-3" />
          </div>
        </div>
      ),
    }
  );
};

export const toastError = (message: string) => {
  const id = toast.error(
    <div className="relative w-75 pr-10">
      <div className="ml-2 text-txt-system-danger">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-txt-system-danger rounded-full"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none !p-3",
      duration: 5000,
      icon: (
        <div className="size-7 flex items-center justify-center bg-foreground-system-danger rounded-lg">
          <div className="size-4 flex items-center justify-center bg-txt-system-danger rounded-full">
            <X className="text-white w-3" />
          </div>
        </div>
      ),
    }
  );
};

export const toastInfo = (message: string) => {
  const id = toast.info(
    <div className="relative w-75 pr-10">
      <div className="ml-2 text-txt-system-information">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-txt-system-information rounded-full"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none !p-3",
      duration: 5000,
      icon: (
        <div className="size-7 flex items-center justify-center bg-foreground-system-information rounded-lg">
          <div className="size-4 flex items-center justify-center bg-txt-system-information rounded-full">
            <IoInformationOutline className="text-white w-4" />
          </div>
        </div>
      ),
    }
  );
};

export const toastWarning = (message: string) => {
  const id = toast.warning(
    <div className="relative w-75 pr-10">
      <div className="ml-2 text-txt-system-warning">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-txt-system-warning rounded-full"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none !p-3",
      duration: 5000,
      icon: (
        <div className="size-7 flex items-center justify-center bg-foreground-system-warning rounded-lg">
          <IoIosWarning className="text-txt-system-warning text-lg" />
        </div>
      ),
    }
  );
};
