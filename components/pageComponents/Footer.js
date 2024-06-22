import { colors } from "@/theme/colors";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#000", color: colors.secondary }}>
      <Stack style={{ padding: 40 }} alignItems="center" spacing={3}>
        <Stack>
          <Link href={`/about`} style={{ color: colors.secondary }}>
            About
          </Link>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Link
            href="https://twitter.com/libertas_nextjs"
            target="_blank"
            aria-label="Libertas Twitter account"
            style={{ color: colors.secondary }}
          >
            <FontAwesomeIcon icon={faXTwitter} size="xl" />
          </Link>
          <Link
            href="https://github.com/Sumansourabh14/libertas-frontend"
            aria-label="Libertas GitHub profile"
            target="_blank"
            style={{ color: colors.secondary }}
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </Link>
        </Stack>
        <div
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "gray",
          }}
        >
          <p>Libertas © {year}. All rights reserved.</p>
        </div>
      </Stack>
    </footer>
  );
};

export default Footer;
