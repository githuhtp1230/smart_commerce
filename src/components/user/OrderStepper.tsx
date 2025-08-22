import { t } from "i18next";
import { Check } from "lucide-react";
import React from "react";

interface Step {
  name: string;
  value: string;
}

interface OrderStepperProps {
  steps: Step[];
  currentStep: number;
}

const OrderStepper: React.FC<OrderStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index <= currentStep;
        const isActive = index === currentStep;
        return (
          <div key={step.value} className="items-center">
            <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-300
                ${
                  isCompleted || isActive
                    ? "border-green-500"
                    : "border-gray-300"
                }
                ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-400"
                }
              `}
            >
              {isCompleted ? <Check size={14} /> : ""}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-[5px] w-60 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-500 to-green-300"
                      : "bg-gray-300"
                  }
                `}
              />
            )}
          </div>
           <span
              className={`mt-1 text-xs text-center ${
                isActive ? "font-semibold text-green-600" : "text-gray-500"
              }`}
            >
              {t(step.name)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStepper;
