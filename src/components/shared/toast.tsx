import { useToastStore } from "../../store/toastStore";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage: React.FC = () => {
  const { message, severity, hideMessage } = useToastStore();

  useEffect(() => {
    if (message) {
      switch (severity) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "info":
          toast.info(message);
          break;
        default:
          toast(message);
      }
      hideMessage();
    }
  }, [message, severity, hideMessage]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastMessage;
