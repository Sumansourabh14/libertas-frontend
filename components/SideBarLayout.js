import { useContext } from "react";
import GlobalSideBar from "./drawerComponents/GlobalSideBar";
import { GlobalContext } from "@/services/globalContext";

const SideBarLayout = ({ children }) => {
  const { user } = useContext(GlobalContext);

  return (
    <>
      {user ? (
        <section>
          <div>{children}</div>
        </section>
      ) : (
        <section style={{ display: "flex" }}>
          <GlobalSideBar />
          <div>{children}</div>
        </section>
      )}
    </>
  );
};

export default SideBarLayout;
