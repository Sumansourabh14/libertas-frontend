import { colors } from "@/styles/colors";

const ErrorText = ({ message }) => {
  return <p style={{ color: colors.error }}>{message}</p>;
};

export default ErrorText;
