import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Admin = [
  {
    counter: "Teacher",
    path: "/admin",
    icon: <SchoolIcon />,
  },
  {
    counter: "Student",
    path: "/admin/student",
    icon: <PersonOutlineIcon />,
  },
  {
    counter: "Guruh",
    path: "/admin/guruh",
    icon: <GroupsIcon />,
  },
  {
    counter: "Course",
    path: "/admin/course",
    icon: <CastForEducationIcon />,
  },
];

export { Admin };
