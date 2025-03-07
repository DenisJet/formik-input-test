import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Поле обязательно для заполнения",
  },
  number: {
    min: "Значение не может быть меньше ${min}",
    max: "Значение не может быть больше ${max}",
  },
});

Yup.addMethod(
  Yup.number,
  "moreThanSumOfFields",
  function (fields: string[], message?: string) {
    return this.test(
      "moreThanSumOfFields",
      message ||
        "Общая площадь должна быть больше суммы жилой площади и площади кухни",
      function (value) {
        if (value === undefined) return true;
        const sum = fields.reduce(
          (acc, field) => acc + (this.parent[field] || 0),
          0,
        );
        return value > sum;
      },
    );
  },
);

export const formValidationSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  floor: Yup.number()
    .required()
    .min(-1)
    .max(
      Yup.ref("totalFloors"),
      "Значение не может быть больше количества этажей в доме",
    ),
  totalFloors: Yup.number().required().min(3).max(200),
  square: Yup.number()
    .required()
    .min(0)
    .max(400)
    .moreThanSumOfFields(["livingSquare", "kitchenSquare"]),
  livingSquare: Yup.number().required().min(0),
  kitchenSquare: Yup.number().required().min(0),
  accept: Yup.boolean().oneOf(
    [true],
    "Необходимо согласие на обработку данных",
  ),
});
