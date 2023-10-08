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
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";

const ProfileSideBar = () => {
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
        <ListItem disablePadding onClick={() => router.push("/profile")}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => router.push("/profile/update-profile")}
        >
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Profile settings" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <div
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
      >
        <p>Libertas © 2023. All rights reserved.</p>
      </div> */}
    </Drawer>
  );
};

export default ProfileSideBar;
