import { useContext } from "react";
import GlobalSideBar from "./drawerComponents/GlobalSideBar";
import { GlobalContext } from "@/services/globalContext";
import { Container, useMediaQuery } from "@mui/material";

const SideBarLayout = ({ children }) => {
  const { user } = useContext(GlobalContext);
  const matches = useMediaQuery("(min-width: 600px)");

  return (
    <>
      {user ? (
        <Container>
          <div>{children}</div>
        </Container>
      ) : (
        <section style={{ display: "flex" }}>
          {matches && <GlobalSideBar />}
          <Container>
            <div>{children}</div>
          </Container>
        </section>
      )}
    </>
  );
};

export default SideBarLayout;
