import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import { SignIn, Admin, Teacher, Student, Guruh, Course } from "@pages";
const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Teacher />} />
          <Route path="/admin/student" element={<Student />} />
          <Route path="/admin/guruh" element={<Guruh />} />
          <Route path="/admin/course" element={<Course />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
