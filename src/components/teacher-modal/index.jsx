import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const { courses, open, setOpen, form, setForm, postTeacher, update, putTeacher, age, setAge } = props;

  const handleClose = () => {
    setOpen(false);
    setForm({});
    setAge("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "guruhName") {
      setAge(value);
    }
    setForm({ ...form, [name]: value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (update) {
      putTeacher(form, form.id);
    } else {
      postTeacher(form);
    }
    setOpen(false);
    setForm({});
    setAge("");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Course Modal
          </Typography>
          <form id="form" className="mt-3 flex flex-col gap-4">
            <TextField name="teacherName" onChange={handleChange} defaultValue={form.teacherName || ""} label="Teacher name" id="outlined-size-small3" fullWidth size="small" />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label">Course name</InputLabel>
              <Select labelId="demo-select-small-label" name="courseName" id="demo-select-small" value={form.courseName || ""} label="Course name" onChange={handleChange}>
                {courses.map((item, i) => (
                  <MenuItem key={i} value={item.courseName}>
                    {item.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" form="form" onClick={handleSave} variant="contained">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
