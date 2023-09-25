import { useNavigate } from "react-router-dom";

export function useHistoryListener(callback) {
  const navigate = useNavigate();

  navigate.listen((location, action) => {
    if (action === "POP") {
      callback();
    }
  });
}
