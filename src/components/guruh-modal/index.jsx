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
  const { courses, open, setOpen, form, setForm, postGuruh, update, putGuruh, age, setAge } = props;

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
      putGuruh(form, form.id);
    } else {
      postGuruh(form);
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
            Guruh Modal
          </Typography>
          <form id="form" className="mt-3 flex flex-col gap-4">
            <TextField name="guruhName" onChange={handleChange} defaultValue={form.guruhName} label="Guruh name" id="outlined-size-small1" fullWidth size="small" />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small-label">Course name</InputLabel>
              <Select labelId="demo-select-small-label10" name="courseName" id="demo-select-small" value={age} label="Course name" onChange={handleChange}>
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
