import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Button } from "@mui/material";
import { CoureseModal } from "@components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomizedTables() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [update, setUpdate] = React.useState(false);

  const getCourse = async function () {
    try {
      const res = await axios.get("http://localhost:3000/course");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourse();
  }, []);

  const handleClick = async (id) => {
    const confirmed = confirm("Salom");
    if (confirmed === true) {
      try {
        const res = await axios.delete(`http://localhost:3000/course/${id}`);
        if (res.status === 200) {
          getCourse();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleCourse = () => {
    setOpen(true);
  };
  const postCourse = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/course/", data);
      if (res.status === 201) {
        getCourse();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (course) => {
    setForm(course);
    setOpen(true);
    setUpdate(true);
  };
  const putCourse = async (course, id) => {
    try {
      const res = await axios.put(`http://localhost:3000/course/${id}`, course);
      if (res.status === 200) {
        getCourse();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CoureseModal open={open} setOpen={setOpen} form={form} setForm={setForm} postCourse={postCourse} update={update} putCourse={putCourse} />
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-4xl">Course</h2>
        <Button onClick={handleCourse} variant="contained">
          Add course
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <StyledTableCell>T/H</StyledTableCell>
              <StyledTableCell align="left">Course name</StyledTableCell>
              <StyledTableCell align="left">Course duration</StyledTableCell>
              <StyledTableCell align="left">Course price</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <StyledTableRow key={i} sx={{ backgroundColor: i % 2 === 0 ? "#555 !important" : "#333" }}>
                <StyledTableCell component="th" scope="row">
                  <span className="text-white">{i + 1}</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <span className="text-white">{item.courseName}</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <span className="text-white">{item.courseDuration} oy</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <span className="text-white">{item.coursePrice}$</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button onClick={() => handleClick(item.id)} className="text-white cursor-pointer mr-3">
                    <DeleteIcon />
                  </button>
                  <button onClick={() => handleEdit(item)} className="text-white cursor-pointer">
                    <EditIcon />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
