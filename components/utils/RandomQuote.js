"use client";
import { GlobalContext } from "@/services/globalContext";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const RandomQuote = () => {
  const { getRandomQuote } = useContext(GlobalContext);

  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    let mounted = true;

    const getQuote = async () => {
      const data = await getRandomQuote();

      if (mounted) {
        setRandomQuote(data);
      }
    };

    getQuote();

    return () => {
      mounted = false;
    };
  }, []);

  console.log(randomQuote);

  return (
    <div>
      {randomQuote && (
        <Stack spacing={2} alignItems="center">
          <FormatQuoteIcon sx={{ fontSize: 100 }} />
          <blockquote
            style={{ textAlign: "center", fontWeight: "300", fontSize: "2rem" }}
          >
            {randomQuote?.quote}
          </blockquote>
          <p style={{ fontWeight: "600" }}>- {randomQuote?.author}</p>
          <p>{randomQuote?.book}</p>
        </Stack>
      )}
    </div>
  );
};

export default RandomQuote;
