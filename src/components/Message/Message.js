import { message } from "antd";

const Message = ({ typeMes = "success" | "error" | "warning", mes }) => {
  message[typeMes](mes);
};

export default Message;
