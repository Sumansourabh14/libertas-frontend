export default function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1rem 5rem 1rem",
      }}
    >
      {children}
    </div>
  );
}
