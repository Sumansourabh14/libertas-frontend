import { useContext } from "react";
import GlobalSideBar from "./drawerComponents/GlobalSideBar";
import { GlobalContext } from "@/services/globalContext";
import { Container } from "@mui/material";

const SideBarLayout = ({ children }) => {
  const { user } = useContext(GlobalContext);

  return (
    <>
      {user ? (
        <Container>
          <div>{children}</div>
        </Container>
      ) : (
        <section style={{ display: "flex" }}>
          <GlobalSideBar />
          <Container>
            <div>{children}</div>
          </Container>
        </section>
      )}
    </>
  );
};

export default SideBarLayout;
