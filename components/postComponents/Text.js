import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Stack, TextField } from "@mui/material";
import Image from "next/image";
import TextEditor from "../textEditor/TextEditor";
import { FileUploader } from "react-drag-drop-files";
import { LoadingButton } from "@mui/lab";

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
  loading,
  imageUploadLoading,
}) => {
  return (
    <div>
      <Stack spacing={2}>
        <TextField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your post*"
          fullWidth
          size="small"
          InputProps={{
            style: {
              fontFamily: "inherit",
              fontSize: "1.2rem",
              backgroundColor: "#000",
            },
          }}
          required
        />

        <Stack spacing={2} alignItems="center">
          <FileUploader
            handleChange={handleImageFile}
            name="file"
            types={["PNG", "JPG", "GIF"]}
          >
            <Stack style={{ border: "1px dashed #FFF", padding: "1rem 8rem" }}>
              {image ? (
                <Stack spacing={4} alignItems="center">
                  <Image
                    src={URL.createObjectURL(image)}
                    width={600}
                    height={300}
                    alt="some image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  {imageUrl ? (
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{
                        padding: 10,
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
                        borderRadius: "0.5rem",
                      }}
                    >
                      <InfoIcon />
                      <p>Click on the button below to upload the image</p>
                    </Stack>
                  )}
                </Stack>
              ) : (
                <Button sx={{ textTransform: "none", color: "#FFF" }}>
                  Drag and drop an image here
                </Button>
              )}
            </Stack>
          </FileUploader>
          <div>
            <LoadingButton
              variant="outlined"
              loading={imageUploadLoading}
              onClick={handleImageUpload}
              sx={{
                textTransform: "capitalize",
                color: "#FFFFFF",
                fontWeight: "600",
                borderRadius: "0rem",
              }}
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Image
            </LoadingButton>
          </div>
        </Stack>

        <TextEditor value={body} setValue={setBody} />

        <div>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleTextPost}
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#FFFFFF",
              fontWeight: "600",
              borderRadius: "0rem",
              width: "6rem",
            }}
            disabled={!title}
          >
            Post
          </LoadingButton>
        </div>
      </Stack>
    </div>
  );
};

export default Text;
