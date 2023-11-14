import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Stack, TextField } from "@mui/material";
import Image from "next/image";
import TextEditor from "../textEditor/TextEditor";
import { FileUploader } from "react-drag-drop-files";

const Text = ({
  title,
  body,
  setTitle,
  setBody,
  handleTextPost,
  image,
  handleImageFile,
  handleImageUpload,
  imageUrl,
}) => {
  return (
    <div>
      <Stack spacing={2}>
        <TextField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title *"
          fullWidth
          size="small"
          InputProps={{
            style: {
              backgroundColor: "#fff",
              fontFamily: "inherit",
              fontSize: "1rem",
            },
          }}
          required
        />

        <Stack spacing={2} alignItems="center">
          <FileUploader
            handleChange={handleImageFile}
            name="file"
            types={["PNG", "JPG"]}
          >
            <Stack style={{ border: "1px dashed black", padding: "1rem 8rem" }}>
              <Button sx={{ textTransform: "none", color: "#000" }}>
                Drag and drop an image here
              </Button>
            </Stack>
          </FileUploader>
          {image && (
            <Stack spacing={4} alignItems="center">
              <Image
                src={URL.createObjectURL(image)}
                width={600}
                height={300}
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {imageUrl ? (
                <Stack
                  direction="row"
                  spacing={1}
                  style={{
                    padding: 10,
                    backgroundColor: "#99cc33",
                    borderRadius: "0.5rem",
                  }}
                >
                  <CheckIcon />
                  <p>Image uploaded!</p>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  spacing={1}
                  style={{
                    padding: 10,
                    backgroundColor: "#ff9966",
                    borderRadius: "0.5rem",
                  }}
                >
                  <InfoIcon />
                  <p>Click on the button below to upload the image</p>
                </Stack>
              )}
            </Stack>
          )}
          <div>
            <Button
              variant="outlined"
              onClick={handleImageUpload}
              style={{
                textTransform: "capitalize",
                fontWeight: "500",
                border: "1px solid black",
                color: "#000",
              }}
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload image
            </Button>
          </div>
        </Stack>

        {/* <TextareaAutosize
          aria-label="textarea for text body"
          placeholder="Enter text *"
          minRows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            width: "100%",
            fontFamily: "inherit",
            fontSize: "1rem",
            padding: 10,
          }}
          required
        /> */}
        <TextEditor value={body} setValue={setBody} />
        <div>
          <Button
            variant="contained"
            onClick={handleTextPost}
            style={{
              textTransform: "capitalize",
              backgroundColor: "#000",
              fontWeight: "600",
              width: 100,
              borderRadius: 0,
            }}
          >
            Post
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default Text;
