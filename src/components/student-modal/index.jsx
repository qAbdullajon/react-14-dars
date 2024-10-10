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
  const { courses, guruhs, teachers, open, setOpen, form, setForm, postStudent, update, putStudent, age, setAge } = props;

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
      putStudent(form, form.id);
    } else {
      postStudent(form);
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
            <TextField name="studentFullName" onChange={handleChange} defaultValue={form.studentFullName || ""} label="Student full name" id="outlined-size-small1" fullWidth size="small" />
            <TextField name="studentAge" onChange={handleChange} defaultValue={form.studentAge || ""} label="Student age" id="outlined-size-small2" fullWidth size="small" />
            <TextField name="phoneNumber" onChange={handleChange} defaultValue={form.phoneNumber || ""} label="Phone number" id="outlined-size-small3" fullWidth size="small" />
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
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label2">Guruh name</InputLabel>
              <Select labelId="demo-select-small-label2" name="guruhName" id="demo-select-small" value={form.guruhName || ""} label="Course name" onChange={handleChange}>
                {guruhs.map((item, i) => (
                  <MenuItem key={i} value={item.guruhName}>
                    {item.guruhName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label3">Teacher name</InputLabel>
              <Select labelId="demo-select-small-label3" name="teacherName" id="demo-select-small" value={form.teacherName || ""} label="Course name" onChange={handleChange}>
                {teachers.map((item, i) => (
                  <MenuItem key={i} value={item.teacherName}>
                    {item.teacherName}
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
