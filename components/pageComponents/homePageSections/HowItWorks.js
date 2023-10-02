import { Stack } from "@mui/material";
import Heading from "../Heading";
import CreateIcon from "@mui/icons-material/Create";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const steps = [
  {
    title: "Sign up",
    body: "Create posts, add text and images, edit them whenver you wish to",
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
  return (
    <Stack
      alignItems="center"
      spacing={6}
      style={{ padding: 100, textAlign: "center" }}
    >
      <Heading title={`How it works?`} />
      <Stack direction="row" spacing={4}>
        {steps.map((step) => (
          <Stack
            spacing={2}
            key={step.title}
            alignItems="center"
            style={{
              padding: "2rem 1rem",
              backgroundColor: "#F5FCCD",
              borderRadius: "0.5rem",
            }}
          >
            {step.icon}
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </Stack>
        ))}
      </Stack>
      <h2>It is that simple!</h2>
    </Stack>
  );
};

export default HowItWorks;
