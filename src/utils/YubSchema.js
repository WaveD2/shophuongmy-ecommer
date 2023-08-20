import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Tên quá ngắn!")
    .max(50, "Tên quá dài!")
    .required("Vui lòng nhập tên"),
  phone: Yup.number().required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .min(5, "Mật khẩu quá ngắn!")
    .max(50, "Mật khẩu quá dài!")
    .required("Vui lòng nhập mật khẩu"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu chưa trùng khớp"
  ),
  email: Yup.string().email("Nhập lại email").required("Vui lòng nhập email"),
});

export const fieldsSignUp = {
  initialValuesSignUp: {
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  },
  fields: [
    {
      label: "Họ và tên",
      name: "name",
      type: "text",
    },
    {
      label: "Số điện thoại",
      name: "phone",
      type: "number",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Mật khẩu",
      name: "password",
      type: "password",
    },
    {
      label: "Nhập lại mật khẩu",
      name: "confirmPassword",
      type: "password",
    },
  ],
};

export const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Mật khẩu quá ngắn!")
    .max(50, "Mật khẩu quá dài!")
    .required("Vui lòng nhập mật khẩu"),
  email: Yup.string().email("Nhập lại email").required("Vui lòng nhập email"),
});

export const fieldsSignIn = {
  initialValuesSignIn: {
    password: "",
    email: "",
  },
  fields: [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Mật khẩu",
      name: "password",
      type: "password",
    },
  ],
};

export const InfoUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Tên quá ngắn!")
    .max(50, "Tên quá dài!")
    .required("Vui lòng nhập tên"),
  city: Yup.string().min(3, "Tên quá ngắn!").max(50, "Tên quá dài!"),
  address: Yup.string(),
  phone: Yup.number().required("Vui lòng nhập số điện thoại"),
  email: Yup.string().email("Nhập lại email").required("Vui lòng nhập email"),
});
export const fieldsInfoUser = {
  fields: [
    {
      label: "Họ và tên",
      name: "name",
      type: "text",
    },
    {
      label: "Số điện thoại",
      name: "phone",
      type: "number",
    },
    {
      label: "Địa chỉ",
      name: "address",
      type: "string",
    },
    {
      label: "Thành phố",
      name: "city",
      type: "string",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ],
};

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  type: Yup.string().required("Vui lòng nhập loại sản phẩm"),
  countInStock: Yup.number().required("Vui lòng nhập số lượn sản phẩm ở kho"),
  price: Yup.string().required("Vui lòng nhập giá tiền sản phẩm"),
  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
  discount: Yup.number(),
});

export const fieldsCreateProduct = {
  initialCreateProduct: {
    name: "",
    type: "",
    countInStock: "",
    price: "",
    description: "",
    discount: "",
  },
  fields: [
    {
      label: "Tên sản phẩm",
      name: "name",
      type: "text",
    },
    {
      label: "Loại sản phẩm",
      name: "type",
      type: "text",
    },
    {
      label: "Số lượng ở kho",
      name: "countInStock",
      type: "text",
    },
    {
      label: "Gía tiền",
      name: "price",
      type: "text",
    },
    {
      label: "Mô tả sản phẩm",
      name: "description",
      type: "text",
    },
    {
      label: "Giam giá",
      name: "discount",
      type: "text",
    },
  ],
};
