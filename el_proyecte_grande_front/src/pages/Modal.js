import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addComment(comment);
    handleClose();
  };

    const handleChange = (event) => {
      console.log(event.target.value)
    setComment(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Comment
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          className={classes.paper}
          style={{ maxWidth: "250px", margin: "auto" }}
        >
          <h2 id="simple-modal-title">Add your comment down here</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              multiline
              minRows={4}
              variant="outlined"
              value={comment}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <Button
              id="AddCommentButton"
              type="submit"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
