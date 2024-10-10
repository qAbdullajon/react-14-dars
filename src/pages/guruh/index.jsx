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
import { GuruhModal } from "@components";

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
  const [courses, setCourses] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [update, setUpdate] = React.useState(false);
  const [age, setAge] = React.useState("");

  const getGuruh = async function () {
    try {
      const res = await axios.get("http://localhost:3000/guruh");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCourses = async function () {
    try {
      const res = await axios.get("http://localhost:3000/course");
      if (res.status === 200) {
        setCourses(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getGuruh();
    getCourses();
  }, []);

  const handleClick = async (id) => {
    const confirmed = confirm("Siz rostanham o'chirmoqchimisiz?");
    if (confirmed === true) {
      try {
        const res = await axios.delete(`http://localhost:3000/guruh/${id}`);
        if (res.status === 200) {
          getGuruh();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleGuruh = () => {
    setOpen(true);
  };
  const postGuruh = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/guruh/", data);
      if (res.status === 201) {
        getGuruh();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (guruh) => {
    setForm(guruh);
    setOpen(true);
    setAge(guruh.courseName);
    setUpdate(true);
  };
  const putGuruh = async (guruh, id) => {
    try {
      const res = await axios.put(`http://localhost:3000/guruh/${id}`, guruh);
      if (res.status === 200) {
        getGuruh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GuruhModal courses={courses} open={open} setOpen={setOpen} form={form} setForm={setForm} postGuruh={postGuruh} update={update} putGuruh={putGuruh} age={age} setAge={setAge} />
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-4xl">Guruh</h2>
        <Button onClick={handleGuruh} variant="contained">
          Add Guruh
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <StyledTableCell>T/H</StyledTableCell>
              <StyledTableCell align="left">Guruh name</StyledTableCell>
              <StyledTableCell align="left">Course name</StyledTableCell>
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
                  <span className="text-white">{item.guruhName}</span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <span className="text-white">{item.courseName}</span>
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
