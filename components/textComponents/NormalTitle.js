import { openSans } from "@/theme/fonts";

const NormalTitle = ({ title }) => {
  return (
    <h1
      className={openSans.className}
      style={{ fontSize: "4rem", fontWeight: "800" }}
    >
      {title}
    </h1>
  );
};

export default NormalTitle;
