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

export default function CustomTable() {
  const rows = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Doe", age: 25 },
    { id: 3, name: "Bob Smith", age: 45 },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="flex materia-ui-table"  aria-label="simple table">
          <TableHead  className="materia-ui-table-head" >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  className="materia-ui-table-body" >
            {rows.map((row) => (
              <TableRow  className="materia-ui-table-row"  key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
