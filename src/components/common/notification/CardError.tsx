import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

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
            className="border-0 bg-red-50 h-13.25 flex items-center"
          >
            <AlertDescription>
              <span className="font-medium text-sm text-red-600">
                {message}
              </span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
