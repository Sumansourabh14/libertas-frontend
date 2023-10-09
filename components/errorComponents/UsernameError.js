const UsernameError = ({ message, color }) => {
  return (
    <p
      style={{
        fontSize: "0.8rem",
        textAlign: "left",
        marginTop: "0.2rem",
        color: color,
      }}
    >
      {message}
    </p>
  );
};

export default UsernameError;
