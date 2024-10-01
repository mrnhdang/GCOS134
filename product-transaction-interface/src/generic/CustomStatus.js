import { useCallback } from "react";

const CustomStatus = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "CANCELLED":
        return "bg-gradient-to-r from-red-500 to-red-700 text-white";
      case "PROCESSING":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case "DONE":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      case "PAID":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    }
  };

  return (
    <div
      className={`inline-block px-4 py-2 rounded-lg font-bold border-solid  ${getStatusStyles(status)}`}
    >
      {status}
    </div>
  );
};
export default CustomStatus;
