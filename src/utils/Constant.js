export const MenuHeader = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    href: "/product",
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
        name: "Thời trang mẹ và bé",
        href: "/product/thoi-trang-me-be",
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
    value: "Đen",
    label: "Đen",
    color: "Black",
  },
  {
    value: "Xám",
    color: "Gray",
    label: "Xám",
  },

  {
    value: "Cam",
    color: "Orange",
    label: "Cam",
  },

  {
    value: "Hồng",
    color: "Pink",
    label: "Hồng",
  },

  {
    value: "Trắng",
    color: "#ccc",
    label: "Trắng",
  },
  {
    value: "Vàng",
    color: "Yellow",
    label: "Vàng",
  },
];

export const optionsSizeProduct = [
  {
    value: "S",
    label: "S",
    color: "#f50",
  },
  {
    value: "M",
    label: "M",
    color: "#2db7f5",
  },
  {
    value: "L",
    label: "L",
    color: "#87d068",
  },
  {
    value: "XL",
    label: "XL",
    color: "#108ee9",
  },
  {
    value: "XXL",
    label: "XXL",
    color: "#f55",
  },
];
