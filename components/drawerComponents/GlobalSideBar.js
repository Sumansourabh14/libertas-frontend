import { ContactEmergency } from "@mui/icons-material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
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
          backgroundColor: "#000",
          color: "#FFF",
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
              <HomeIcon color="#FFF" />
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
        <ListItem disablePadding onClick={() => router.push("/blog")}>
          <ListItemButton>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/about")}>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Libertas" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/contact")}>
          <ListItemButton>
            <ListItemIcon>
              <ContactEmergency />
            </ListItemIcon>
            <ListItemText primary="Contact" />
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
        <p>Libertas © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </Drawer>
  );
};

export default GlobalSideBar;
