export const MenuHeader = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    isDown: true,
    menuItem: [
      {
        name: "Thời trang bé trai",
        href: "/product/thoi-trang-be-trai",
      },
      {
        name: "Thời trang bé trai",
        href: "/product/thoi-trang-be-gai",
      },
      {
        name: "Thời trang trẻ em",
        href: "/product/thoi-trang-tre-em",
      },
      {
        name: "Phụ kiện",
        href: "/product/phu-kien",
      },
    ],
  },
  {
    name: "Sản phẩm khuyến mãi",
    href: "/product-sales",
  },
  {
    name: "Giới thiệu",
    href: "/about-us",
  },
];

export const OptionPriceProduct = [
  {
    value: "0-50000",
    title: "0 - 50.000",
  },
  {
    value: "50000-100000",
    title: "50.000 - 100.000",
  },
  {
    value: "100000-500000",
    title: "100.000 - 500.000",
  },
  {
    value: "500000-1000000",
    title: "500.000 - 1.000.000",
  },
];
export const OptionDiscountProduct = [
  {
    value: "0-10",
    title: "dưới 10%",
  },
  {
    value: "10-20",
    title: "10% - 20%",
  },
  {
    value: "20-50",
    title: "20% - 50%",
  },
];

//reponsite
const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
};

// Payment
export const itemsDelivery = [
  {
    title: "20.000 VND",
    description: "Dưới 200.000 VND",
  },
  {
    title: "10.000 VND",
    description: "Từ 200.000 VND đến dưới 500.000 VND",
  },
  {
    title: "Free ship",
    description: "Trên 500.000 VND",
  },
];

export const orderConstant = [
  {
    value: "fast",
    title: "Giao hàng nhanh",
  },
  {
    value: "later",
    title: "Giao hàng tiết kiệm",
  },
];

export const Payments = [
  {
    value: "later_money",
    title: "Thanh toán tiền mặt khi nhận hàng",
  },
  {
    value: "paypal",
    title: "Thanh toán bằng paypal",
  },
  {
    value: "momo",
    title: "Thanh toán bằng momo",
  },
];

export const optionsColorsProduct = [
  {
    value: "black",
    label: "Đen",
  },
  {
    value: "gray",
    label: "Xám",
  },

  {
    value: "orange",
    label: "Cam",
  },

  {
    value: "pink",
    label: "Hòng",
  },

  {
    value: "white",
    label: " Trắng",
  },
  {
    value: "yellow",
    label: "Vàng",
  },
];

export const optionsSizeProduct = [
  {
    value: "S",
    label: "S",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "XL",
    label: "XL",
  },
  {
    value: "XXL",
    label: "XXL",
  },
];

export const optionNavBarPrice = [];

export const valueDiscount = [
  { key: "GIAMGIA50", discount: 50 },
  { key: "GIAMGIA20", discount: 20 },
  { key: "GIAMGIA10", discount: 10 },
];
