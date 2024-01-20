import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faNewspaper,
  faScrewdriverWrench,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "Feed",
    icon: faNewspaper,
    handleClick: "/feed",
  },
  {
    title: "Dashboard",
    icon: faTableColumns,
    handleClick: "/profile",
  },
  {
    title: "Profile Settings",
    icon: faGear,
    handleClick: "/profile/update-profile",
  },
  {
    title: "Account Settings",
    icon: faScrewdriverWrench,
    handleClick: "/profile/account-settings",
  },
];

const ProfileSideBar = () => {
  const router = useRouter();
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Drawer
      sx={{
        width: mobileScreenSize ? 50 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: mobileScreenSize ? 50 : 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            onClick={() => router.push(item.handleClick)}
            style={{ paddingBottom: mobileScreenSize ? 10 : 0 }}
          >
            <ListItemButton>
              <FontAwesomeIcon
                icon={item.icon}
                style={{ paddingRight: mobileScreenSize ? 0 : 20 }}
                size="lg"
              />
              {!mobileScreenSize && <ListItemText primary={item.title} />}
            </ListItemButton>
          </ListItem>
        ))}
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
        <p>Libertas © {new Date().getFullYear()}. All rights reserved.</p>
      </div> */}
    </Drawer>
  );
};

export default ProfileSideBar;
