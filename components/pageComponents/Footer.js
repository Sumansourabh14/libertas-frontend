import { colors } from "@/theme/colors";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: colors.accent }}>
      <Stack style={{ padding: 40 }} alignItems="center" spacing={3}>
        <Stack direction="row" spacing={2}>
          <Link href="https://twitter.com/libertas_nextjs" target="_blank">
            <FontAwesomeIcon icon={faXTwitter} size="xl" />
          </Link>
          <Link
            href="https://github.com/Sumansourabh14/libertas-frontend"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </Link>
        </Stack>
        <div
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          <p>Libertas © {year}. All rights reserved.</p>
        </div>
      </Stack>
    </footer>
  );
};

export default Footer;