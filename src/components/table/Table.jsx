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
import styled from "styled-components";
import { Selector } from "../sem-selector/SemSelector";

export default function CustomTable({ courses }) {

  return (
    <>
      <TableContainer className="temp" component={Paper}>
        <Table className="flex materia-ui-table" aria-label="simple table">
          <TableHead className="materia-ui-table-head">
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
            {courses?.map((row, ind) => (
              <TableRow className="materia-ui-table-row" key={ind}>
                <TableCell>{row.courseName}</TableCell>
                <TableCell>{row.credits}</TableCell>
                <TableCell>{row.professor}</TableCell>
                <TableCell>{row.limit}</TableCell>
                <TableCell>{row.eligibility}</TableCell>
                <TableCell>
                  <Selector name="course-select" id="course-select">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Selector>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
