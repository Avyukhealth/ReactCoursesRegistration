"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./AdminCustomTable.css");
const material_1 = require("@mui/material");
function AdminCustomTable({ courses }) {
    console.log(courses);
    return (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "center", maxHeight: "50vh" } },
        react_1.default.createElement(material_1.TableContainer, { className: "table-container", component: material_1.Paper, sx: { maxWidth: "90vw" } },
            react_1.default.createElement(material_1.Table, { className: "flex materia-ui-table", "aria-label": "simple table" },
                react_1.default.createElement(material_1.TableHead, { className: "materia-ui-table-head", sx: { position: "sticky", top: "-1px" } },
                    react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, null, "CourseName"),
                        react_1.default.createElement(material_1.TableCell, null, "Credits "),
                        react_1.default.createElement(material_1.TableCell, null, "Professor"),
                        react_1.default.createElement(material_1.TableCell, null, "Limit"),
                        react_1.default.createElement(material_1.TableCell, null, "Eligibility"),
                        react_1.default.createElement(material_1.TableCell, null, "Sem"))),
                react_1.default.createElement(material_1.TableBody, { className: "materia-ui-table-body" }, courses?.map((row) => (react_1.default.createElement(material_1.TableRow, { key: row.courseId, className: "materia-ui-table-row" },
                    react_1.default.createElement(material_1.TableCell, null, row.courseName),
                    react_1.default.createElement(material_1.TableCell, null, row.credits),
                    react_1.default.createElement(material_1.TableCell, null, row.professor),
                    react_1.default.createElement(material_1.TableCell, null, row.limit),
                    react_1.default.createElement(material_1.TableCell, null, row.eligibility),
                    react_1.default.createElement(material_1.TableCell, null, row.sem)))))))));
}
exports.default = AdminCustomTable;
