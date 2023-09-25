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
export const listTextPaymentZalo = [
  "Mẹ vào Zalo chọn phần Khám phá",
  "Mẹ chọn ZaloPay",
  "Mẹ quét mã QR của shop và thực hiện thanh toán đơn hàng",
  "Mẹ chụp lại màn hình thanh toán và liên hệ với shop Hường Mỹ để xác nhận",
];
export const listTextPaymentBank = [
  "Mẹ vào ngân hàng",
  " Mẹ quét mã QR của shop và thực hiện thanh toán đơn hàng",
  "Hoặc mẹ chuyển khoản qua tài khoản ",
  "STK : 003538420",
  "Ngân hàng : VIB",
  "Tên người nhận : Nguyễn Đăng Tùng",
  "Mẹ chụp lại màn hình thanh toán và liên hệ với shop Hường Mỹ để xác nhận",
];

export const orderConstant = {
  delivery: {
    fast: "FAST",
    gojek: "GO_JEK",
  },
  payment: {
    later_money: "Thanh toán tiền mặt khi nhận hàng",
    paypal: "Thanh toán bằng paypal",
  },
};

export const Payments = ["Zalo", "Ngân hàng", "Thanh toán khi nhận hàng"];
