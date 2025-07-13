import { toast } from "sonner";
import {
  Check,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
  XCircle,
} from "lucide-react";
import { FaInfo } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoInformationOutline } from "react-icons/io5";

export const toastSuccess = (message: string) => {
  const id = toast.success(
    <div className="relative w-full pr-19">
      <div className="text-txt-system-success ml-3">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-0 right-0 text-txt-system-success rounded-full p-1"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none",
      duration: 3000,
      icon: (
        <div className="bg-foreground-system-success flex justify-center items-center size-7 rounded-lg">
          <div className="flex justify-center items-center bg-txt-system-success rounded-full size-4">
            <Check className="text-white !w-3" />
          </div>
        </div>
      ),
    }
  );
};

export const toastError = (message: string) => {
  const id = toast.error(
    <div className="relative w-75 pr-19 ">
      <div className="text-txt-system-danger ml-3">{message}</div>
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-0 right-0 text-txt-system-danger rounded-full p-1"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none",
      duration: 3000,
      icon: (
        <div className="bg-foreground-system-danger flex justify-center items-center size-7 rounded-lg">
          <div className="flex justify-center items-center bg-txt-system-danger rounded-full size-4">
            <X className="text-white !w-3" />
          </div>
        </div>
      ),
    }
  );
};

export const toastInfo = (message: string) => {
  const id = toast.info(
    <div className="relative w-75 pr-19">
      <div className="text-txt-system-information ml-3">{message}</div>

      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-0 right-0 text-txt-system-information rounded-full p-1"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none",
      duration: 3000,
      icon: (
        <div className="bg-foreground-system-information flex justify-center items-center size-7 rounded-lg">
          <div className="flex justify-center items-center bg-txt-system-information rounded-full size-4">
            <IoInformationOutline className="text-white w-4" />
          </div>
        </div>
      ),
    }
  );
};

export const toastWarning = (message: string) => {
  const id = toast.warning(
    <div className="relative w-75 pr-19">
      <div className="text-txt-system-warning ml-3">{message}</div>

      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-0 right-0 text-txt-system-warning rounded-full p-1"
      >
        <X size={16} />
      </button>
    </div>,
    {
      className: "!bg-background-secondary !border-none",
      duration: 5000,
      icon: (
        <div className="bg-foreground-system-warning flex justify-center items-center size-7 rounded-lg">
          <IoIosWarning className="text-txt-system-warning text-lg" />
        </div>
      ),
    }
  );
};
