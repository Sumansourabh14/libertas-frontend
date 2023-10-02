import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Stack, TextField, TextareaAutosize } from "@mui/material";
import Image from "next/image";

const Text = ({
  title,
  body,
  setTitle,
  setBody,
  handleTextPost,
  image,
  handleImageFile,
  handleImageUpload,
}) => {
  return (
    <div>
      <Stack
        style={{
          padding: 20,
          backgroundColor: "#f3f3f3",
          borderRadius: 10,
          boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
        }}
        spacing={2}
      >
        <TextField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          fullWidth
          size="small"
          InputProps={{
            style: {
              backgroundColor: "#fff",
              fontFamily: "inherit",
              fontSize: "1rem",
            },
          }}
        />

        <Stack direction="row" spacing={2}>
          {/* <TextField type="file" onChange={handleImageFile} /> */}
          <input type="file" onChange={handleImageFile} accept="image/*" />
          <div>
            <Button
              variant="contained"
              onClick={handleImageUpload}
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload image
            </Button>
          </div>
        </Stack>

        {image && (
          <Image
            src={URL.createObjectURL(image)}
            width={600}
            height={300}
            alt=""
          />
        )}

        <TextareaAutosize
          aria-label="textarea for text body"
          placeholder="Enter text"
          minRows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            width: "100%",
            fontFamily: "inherit",
            fontSize: "1rem",
            padding: 10,
          }}
        />
        <div>
          <Button
            variant="contained"
            type="submit"
            onClick={handleTextPost}
            style={{ backgroundColor: "#000" }}
          >
            Post
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default Text;
