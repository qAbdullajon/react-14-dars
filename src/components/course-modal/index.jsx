import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function BasicModal(props) {
  const { open, setOpen, form, setForm, getCourse, postCourse, update, putCourse } = props;
  const handleClose = () => {
    setOpen(false);
    setForm({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (update) {
      putCourse(form, form.id);
    } else {
      postCourse(form);
    }
    setOpen(false);
    setForm({});
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Course Modal
          </Typography>
          <form id="form" className="mt-3 flex flex-col gap-2">
            <TextField name="courseName" onChange={handleChange} defaultValue={form.courseName} label="Course name" id="outlined-size-small1" fullWidth size="small" />
            <TextField name="courseDuration" onChange={handleChange} defaultValue={form.courseDuration} label="Course duration" id="outlined-size-small2" fullWidth size="small" />
            <TextField name="coursePrice" onChange={handleChange} defaultValue={form.coursePrice} label="Course price" id="outlined-size-small3" fullWidth size="small" />
            <Button type="submit" form="form" onClick={handleSave} variant="contained">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
