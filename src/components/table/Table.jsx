import "./Table.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Selector } from "../semSelector/SemSelector";

export default function CustomTable({ courses, handleSelectCourses }) {

  return (
    <div
      style={{ display: "flex", justifyContent: "center", maxHeight: "50vh" }}
    >
      <TableContainer
        className="table-container"
        component={Paper}
        sx={{ maxWidth: "90vw" }}
      >
        <Table className="flex materia-ui-table" aria-label="simple table">
          <TableHead
            className="materia-ui-table-head"
            sx={{ position: "sticky", top: "-1px" }}
          >
            <TableRow>
              <TableCell>CourseName</TableCell>
              <TableCell>Credits </TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Eligibility</TableCell>
              <TableCell>Enroll (Yes/No)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="materia-ui-table-body">
            {courses?.map((row) => (
              <TableRow key={row.courseId} className="materia-ui-table-row">
                <TableCell>{row.courseName}</TableCell>
                <TableCell>{row.credits}</TableCell>
                <TableCell>{row.professor}</TableCell>
                <TableCell>{row.limit}</TableCell>
                <TableCell>{row.eligibility}</TableCell>
                <TableCell>
                  <Selector
                    onChange={(e) => {
                      handleSelectCourses(e.target.id, e.target.value);
                    }}
                    name="course-select"
                    id={row.courseId}
                    key={row.courseId}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </Selector>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
