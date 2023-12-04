import { Spin } from "antd";
export default function LoadingForComponentLazy({ children }) {
  return <Spin tip="Loading">{children}</Spin>;
}
