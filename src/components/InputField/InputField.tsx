import React from "react";
import { Input, Checkbox, HStack } from "@chakra-ui/react";
import { useField } from "formik";
import { Radio, RadioGroup } from "../ui/radio";

type InputFieldProps = {
  name: string;
  label: string;
  type: "text" | "number" | "checkbox" | "radio";
  options?: string[];
};

export default function InputField({
  label,
  type,
  name,
  options,
}: InputFieldProps) {
  const [field, meta] = useField(name);

  return (
    <div>
      {type === "checkbox" ? (
        <Checkbox.Root {...field}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{label}</Checkbox.Label>
        </Checkbox.Root>
      ) : type === "radio" ? (
        <RadioGroup {...field} id={name}>
          <HStack gap={4}>
            <label htmlFor={name}>{label}</label>
            {options?.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      ) : (
        <div>
          <label htmlFor={name}>{label}</label>
          <Input {...field} id={name} type={type} />
        </div>
      )}
    </div>
  );
}
