// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components) {
  // Allows customizing built-in components, e.g. to add styling.
  return {
    p: ({ children }) => (
      <p style={{ fontSize: "18px", marginBottom: "1.2rem" }}>{children}</p>
    ),
    h1: ({ children }) => (
      <h1 style={{ marginBottom: "1rem", fontSize: "40px", color: "#FFF" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ marginBottom: "1rem", color: "#FFF" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ marginBottom: "1rem", color: "#FFF" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ marginBottom: "1rem", color: "#FFF" }}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 style={{ marginBottom: "1rem", color: "#FFF" }}>{children}</h5>
    ),
    ul: ({ children }) => (
      <ul style={{ marginBottom: "1.2rem" }}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol style={{ marginBottom: "1.2rem" }}>{children}</ol>
    ),
    li: ({ children }) => <li style={{ fontSize: "18px" }}>{children}</li>,
    ...components,
  };
}
