"use client";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/react";
import InputField from "../InputField/InputField";
import { formValidationSchema } from "./formValidationSchema";

export default function FormComponent() {
  const radioOptions = ["email", "sms"];

  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        floor: "",
        totalFloors: "",
        square: "",
        livingSquare: "",
        kitchenSquare: "",
        notifications: "email",
        accept: false,
      }}
      validationSchema={formValidationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.resetForm();
      }}
    >
      <Form className="w-[500px] flex flex-col gap-4">
        <p>Ведите данные объекта:</p>
        <InputField name="name" label="Название" type="text" />
        <InputField name="address" label="Адрес" type="text" />
        <InputField name="floor" label="Этаж" type="number" />
        <InputField
          name="totalFloors"
          label="Количество этажей"
          type="number"
        />
        <InputField name="square" label="Площадь" type="number" />
        <InputField name="livingSquare" label="Жилая площадь" type="number" />
        <InputField name="kitchenSquare" label="Площадь кухни" type="number" />

        <InputField
          name="notifications"
          label="Получать уведомления по:"
          type="radio"
          options={radioOptions}
        />

        <InputField
          name="accept"
          label="Согласие на обработку данных"
          type="checkbox"
        />

        <Button type="submit">Отправить</Button>
      </Form>
    </Formik>
  );
}
