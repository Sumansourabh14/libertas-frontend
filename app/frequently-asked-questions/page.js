"use client";
import Footer from "@/components/pageComponents/Footer";
import NormalTitle from "@/components/textComponents/NormalTitle";
import faq from "@/utils/content/faqHomePage.json";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const FrequentlyAskedQuestions = () => {
  useEffect(() => {
    document.title = "Frequently Asked Questions | Libertas";
  }, []);

  return (
    <Stack>
      <Stack style={{ padding: "4rem 0 2rem 0" }} alignItems="center">
        <Stack
          spacing={3}
          style={{ textAlign: "center", padding: "50px 20px" }}
        >
          <NormalTitle title="Frequently Asked Questions" />
          <p style={{ textAlign: "center" }}>Learn more about Libertas here</p>
        </Stack>
      </Stack>
      <Grid
        container
        gap={2}
        sx={{ px: 8, mb: 20, maxWidth: "1000px", mx: "auto" }}
      >
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
              <AccordionDetails id="panel-content" sx={{ textAlign: "left" }}>
                <Typography>{question.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </Stack>
  );
};

export default FrequentlyAskedQuestions;
