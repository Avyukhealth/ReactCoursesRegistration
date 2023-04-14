import React from "react";
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
import CustomTableProps from "../../models/customTableProps";
import Event from "../../models/event";

export default function CustomTable({ courses, handleSelectCourses }: CustomTableProps) {
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
            {courses?.map((course) => (
              <TableRow key={course.courseId} className="materia-ui-table-row">
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.professor}</TableCell>
                <TableCell>{course.limit}</TableCell>
                <TableCell>{course.eligibility}</TableCell>
                <TableCell>
                  <Selector
                    onChange={(e: Event) => {
                      console.log("channnn")
                      handleSelectCourses(e.target.id, e.target.value);
                    }}
                    name="course-select"
                    id={course.courseId}
                    key={course.courseId}
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
    </div >
  );
}
