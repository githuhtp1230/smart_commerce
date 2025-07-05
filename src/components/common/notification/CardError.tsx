import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  message?: string;
}

export default function CardError({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="form-error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            variant="destructive"
            className="border-0 bg-foreground-system-danger h-13.25 flex items-center"
          >
            <AlertDescription className="flex items-center gap-3">
              <div className="size-6 bg-icon-system-danger rounded-full flex justify-center items-center">
                <X className="text-white size-4" />
              </div>
              <span className="font-medium text-sm text-txt-system-danger">
                {message}
              </span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
