export function kiemTraSoDienThoai(soDienThoai) {
  if (soDienThoai.length < 8 || soDienThoai.length > 15) {
    return false;
  }
  const regex = /^[0-9]+$/;
  if (!regex.test(soDienThoai)) {
    return false;
  }
  return true;
}

export function kiemTraObjectKhongRong(obj) {
  return typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;
}
