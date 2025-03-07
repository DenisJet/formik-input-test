import React from "react";
import { Input, Checkbox, HStack } from "@chakra-ui/react";
import { useField } from "formik";
import { Radio, RadioGroup } from "../ui/radio";
import { Field } from "../ui/field";

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
        <Checkbox.Root {...field} invalid={!!(meta.touched && meta.error)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{label}</Checkbox.Label>
          {meta.touched && meta.error && (
            <div className="text-red-400 font-light !text-xs text-right">
              {meta.error}
            </div>
          )}
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
        <Field
          invalid={!!(meta.touched && meta.error)}
          label={label}
          errorText={meta.error}
        >
          <Input {...field} id={name} type={type} />
        </Field>
      )}
    </div>
  );
}
