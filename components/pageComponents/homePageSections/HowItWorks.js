import { Container, Stack, useMediaQuery } from "@mui/material";
import Heading from "../Heading";
import CreateIcon from "@mui/icons-material/Create";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { openSans } from "@/theme/fonts";

const steps = [
  {
    title: "Sign up",
    body: "Create an account on Libertas by choosing a username of your choice",
    icon: <AppRegistrationIcon />,
    image: "",
  },
  {
    title: "Create",
    body: "Create posts, add text and images, edit them whenver you wish to",
    icon: <CreateIcon />,
    image: "",
  },
  {
    title: "Discuss",
    body: "Engage with others by upvoting, downvoting posts, adding comments",
    icon: <QuestionAnswerIcon />,
    image: "",
  },
];

const HowItWorks = () => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Stack sx={{ bgcolor: "#FFF" }}>
      <Container>
        <Stack
          alignItems="center"
          spacing={6}
          style={{
            padding: mobileScreenSize ? "100px 30px" : "140px 60px",
            textAlign: "center",
          }}
        >
          <h2
            className={openSans.className}
            style={{
              fontSize: mobileScreenSize ? "2rem" : "3rem",
              fontWeight: "100",
              color: "#000",
            }}
          >
            How it works?
          </h2>
          <Stack direction={mobileScreenSize ? "column" : "row"} spacing={8}>
            {steps.map((step) => (
              <Stack
                spacing={2}
                key={step.title}
                alignItems="center"
                style={{
                  padding: "4rem 2rem",
                  backgroundColor: "#F3F3F3",
                  color: "#000",
                }}
              >
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HowItWorks;
