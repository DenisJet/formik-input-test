import * as Yup from "yup";

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
  name: Yup.string().required("Поле обязательно для заполнения"),
  address: Yup.string().required("Поле обязательно для заполнения"),
  floor: Yup.number()
    .required("Поле обязательно для заполнения")
    .min(-1, "Значение не может быть меньше -1")
    .max(
      Yup.ref("totalFloors"),
      "Значение не может быть больше количества этажей в доме",
    ),
  totalFloors: Yup.number()
    .required("Поле обязательно для заполнения")
    .min(3, "Значение не может быть меньше 3")
    .max(200, "Значение не может быть больше 200"),
  square: Yup.number()
    .required("Поле обязательно для заполнения")
    .min(0, "Значение не может быть меньше 0")
    .max(400, "Значение не может быть больше 400")
    .moreThanSumOfFields(["livingSquare", "kitchenSquare"]),
  livingSquare: Yup.number()
    .required("Поле обязательно для заполнения")
    .min(0, "Значение не может быть меньше 0"),
  kitchenSquare: Yup.number()
    .required("Поле обязательно для заполнения")
    .min(0, "Значение не может быть меньше 0"),
  accept: Yup.boolean().oneOf(
    [true],
    "Необходимо согласие на обработку данных",
  ),
});
