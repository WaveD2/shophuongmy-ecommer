import * as Yup from "yup";
import SelectForm from "../components/InputForm/SelectForm";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Tên quá ngắn!")
    .max(50, "Tên quá dài!")
    .required("Vui lòng nhập tên"),
  phone: Yup.number("Vui lòng nhập đúng số").required(
    "Vui lòng nhập số điện thoại"
  ),
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
  address: Yup.string().min(3, "Tên quá ngắn!").max(50, "Tên quá dài!"),
  phone: Yup.number("Vui lòng nhập đúng số").required(
    "Vui lòng nhập số điện thoại"
  ),
  email: Yup.string().email("Nhập lại email").required("Vui lòng nhập email"),
});
export const fieldsInfoUser = {
  initialValuesInfoUser: {
    name: "",
    city: "",
    address: "",
    phone: "",
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
  countInStock: Yup.number("Vui lòng nhập đúng số").required(
    "Vui lòng nhập số lượng sản phẩm ở kho"
  ),
  price: Yup.string().required("Vui lòng nhập giá tiền sản phẩm"),
  description: Yup.string(),
  discount: Yup.number("Vui lòng nhập đúng số"),
});

export const fieldsCreateProduct = {
  initialCreateProduct: {
    name: "",
    price: "",
    description: "",
    countInStock: "",
    discount: "",
    type: "",
  },
  fields: [
    {
      label: "Tên sản phẩm",
      name: "name",
      type: "text",
    },
    {
      label: "Loại",
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
      label: "Giam giá",
      name: "discount",
      type: "text",
    },
    {
      label: "Mô tả sản phẩm",
      name: "description",
      as: "textarea",
      type: "text",
    },
  ],
};

export const CreateDressOrderSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Tên quá ngắn!")
    .max(50, "Tên quá dài!")
    .required("Vui lòng nhập tên"),
  phone: Yup.number("Vui lòng nhập đúng số").required(
    "Vui lòng nhập số điện thoại"
  ),
  dress: Yup.string().required("Vui lòng nhập địa chỉ"),
  noteToAdmin: Yup.string(),
});
export const fieldsDressOrderSchema = {
  initialCreateDressOrder: {
    name: "",
    phone: "",
    address: "",
    noteToAdmin: "",
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
      type: "text",
    },
    {
      label: "Địa chỉ nhận hàng",
      name: "address",
      type: "text",
    },
    {
      label: "Ghi chú cho Shop (nếu có)",
      name: "noteToAdmin",
      type: "text",
      as: "textarea",
    },
  ],
};
