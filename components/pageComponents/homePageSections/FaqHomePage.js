import { openSans } from "@/theme/fonts";
import faq from "@/utils/content/faqHomePage.json";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";

const FaqHomePage = () => {
  const mobileScreenSize = useMediaQuery("(max-width:600px)");

  return (
    <Stack>
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
              color: "#FFF",
            }}
          >
            Frequently Asked Questions
          </h2>

          <Grid container gap={2}>
            {faq.map((question, index) => (
              <Grid xs={12} key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                  >
                    <Typography>{question.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    id="panel-content"
                    sx={{ textAlign: "left" }}
                  >
                    <Typography>{question.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>

          <Link href={`/frequently-asked-questions`}>Learn more</Link>
        </Stack>
      </Container>
    </Stack>
  );
};

export default FaqHomePage;
