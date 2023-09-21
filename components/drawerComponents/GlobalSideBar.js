import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";

const GlobalSideBar = () => {
  const router = useRouter();
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => router.push("/feed")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/profile")}>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/profile")}>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Libertas" />
          </ListItemButton>
        </ListItem>
      </List>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
      >
        <p>Libertas © 2023. All rights reserved.</p>
      </div>
    </Drawer>
  );
};

export default GlobalSideBar;
