"use client";

import { useState } from "react";
import Header from "./Steps";
import Navigate from "./Navigate";
import TextField from "@/common/textField";
import { FieldName, SubmitHandler, useForm } from "react-hook-form";
import { FormDataSchema } from "@/lib/FormDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

type TFormFields = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: 1,
    name: "Personal Information",
    required: ["firstName", "lastName", "birthDate"],
  },
  { id: 2, name: "Address", required: ["email", "phone"] },
  { id: 3, name: "Complete" },
];

export default function Form() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<TFormFields>({ resolver: zodResolver(FormDataSchema) });

  const onSubmit: SubmitHandler<TFormFields> = (data) => {
    console.log(data);
  };

  const stepHandler = async (operation: "to" | "next" | "prev", step = 0) => {
    const validation = async () => {
      const fields = steps[currentStep].required;
      if (fields) {
        const output = await trigger(fields as FieldName<TFormFields>[], {
          shouldFocus: true,
        });
        if (
          output &&
          currentStep === steps.length - 2 &&
          step === steps.length - 1
        ) {
          await handleSubmit(onSubmit)();
          return true;
        }
        return output;
      }
      return false;
    };

    const isValid = await validation();
    const previousHandler = () => setPreviousStep(currentStep);

    switch (operation) {
      case "to":
        if (
          currentStep > step || // backward
          (currentStep + 1 === step && isValid && currentStep !== step) // forward
        ) {
          previousHandler();
          setCurrentStep(step);
        }
        break;

      case "next":
        if (currentStep < steps.length - 1 && isValid) {
          previousHandler();
          setCurrentStep((prev) => prev + 1);
        }
        break;

      case "prev":
        if (currentStep > 0) {
          previousHandler();
          setCurrentStep((prev) => prev - 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <section className="form-section">
      {/* steps */}
      <Header steps={steps} current={currentStep} handler={stepHandler} />

      {/* form */}
      <form className="form">
        {currentStep === 0 && (
          <motion.div
            initial={{
              x: currentStep - previousStep >= 0 ? "50%" : "-50%",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="form-step"
          >
            <TextField
              required
              name="firstName"
              label="First Name"
              register={register}
              error={errors.firstName}
            />
            <TextField
              required
              name="lastName"
              label="Last Name"
              register={register}
              error={errors.lastName}
            />
            <TextField
              required
              type="date"
              label="Birthday"
              name="birthDate"
              register={register}
              error={errors.birthDate}
            />
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{
              x: currentStep - previousStep >= 0 ? "50%" : "-50%",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="form-step"
          >
            <TextField
              required
              type="email"
              name="email"
              label="Email"
              register={register}
              error={errors.email}
            />
            <TextField
              required
              type="tel"
              name="phone"
              label="Phone Number"
              register={register}
              error={errors.phone}
            />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            initial={{
              x: currentStep - previousStep >= 0 ? "50%" : "-50%",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h1 className="regard">congratulation</h1>
            <p className="regard-description">Thank you for your submission.</p>
          </motion.div>
        )}
      </form>

      {/* navigate */}
      <Navigate handler={stepHandler} />
    </section>
  );
}
