import Image from "next/image";

const FeatureImage = ({ source, altText }) => {
  return (
    <Image
      src={source}
      alt={altText}
      width={800}
      height={300}
      style={{
        maxWidth: "100%",
        height: "auto",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    />
  );
};

export default FeatureImage;
