import categories from "@/utils/content/reportCategories.json";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import ClosePopUpButton from "../buttonComponents/ClosePopUpButton";

const ReportPostPopup = ({
  open,
  closePopUp,
  loading,
  comment,
  onCommentChange,
  reason,
  onReasonChange,
  handleSubmitReport,
  reportMessage,
}) => {
  return (
    <Dialog
      open={open}
      onClose={closePopUp}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <Box
        sx={{
          backgroundColor: "#171717",
          boxShadow: 24,
          padding: "1rem",
        }}
      >
        <ClosePopUpButton handleClosePopUp={closePopUp} />
        <DialogTitle sx={{ textAlign: "center" }}>Report Post</DialogTitle>

        <DialogContent>
          {!!reportMessage ? (
            <p>{reportMessage}</p>
          ) : (
            <Stack gap={4}>
              <p>
                Thank you for helping to keep our community safe. Please let us
                know why you are reporting this post, and we will review it as
                soon as possible.
              </p>
              {!!categories && (
                <>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="a group of radio buttons for selecting an appropriate reason for reporting the post"
                      value={reason}
                      onChange={onReasonChange}
                    >
                      <Grid container>
                        {categories.map((category) => (
                          <Grid xs={12} sm={6} lg={4} key={category.id}>
                            <FormControlLabel
                              value={category.value}
                              control={<Radio />}
                              label={category.category}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </>
              )}
              {!!reason && (
                <Stack gap={1}>
                  <InputLabel>Any comments?</InputLabel>
                  <TextField
                    id="outlined-textarea"
                    placeholder="For example, this post presents false info, please take action!"
                    value={comment}
                    onChange={onCommentChange}
                    multiline
                    rows={4}
                  />
                </Stack>
              )}
            </Stack>
          )}
        </DialogContent>

        <Stack alignItems="center">
          {!!reportMessage ? (
            <Button
              variant="contained"
              onClick={closePopUp}
              sx={{
                color: "#000",
                borderRadius: "0rem",
                fontWeight: "600",
                textTransform: "capitalize",
                backgroundColor: "#FFF",
              }}
            >
              Close
            </Button>
          ) : (
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#FFFFFF",
                fontWeight: "600",
                borderRadius: "0rem",
                marginTop: 2,
              }}
              onClick={handleSubmitReport}
              disabled={!reason}
            >
              Report
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ReportPostPopup;
