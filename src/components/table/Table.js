"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Table.css");
const material_1 = require("@mui/material");
const SemSelector_1 = require("../semSelector/SemSelector");
function CustomTable({ courses, handleSelectCourses }) {
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
                        react_1.default.createElement(material_1.TableCell, null, "Enroll (Yes/No)"))),
                react_1.default.createElement(material_1.TableBody, { className: "materia-ui-table-body" }, courses?.map((course) => (react_1.default.createElement(material_1.TableRow, { key: course.courseId, className: "materia-ui-table-row" },
                    react_1.default.createElement(material_1.TableCell, null, course.courseName),
                    react_1.default.createElement(material_1.TableCell, null, course.credits),
                    react_1.default.createElement(material_1.TableCell, null, course.professor),
                    react_1.default.createElement(material_1.TableCell, null, course.limit),
                    react_1.default.createElement(material_1.TableCell, null, course.eligibility),
                    react_1.default.createElement(material_1.TableCell, null,
                        react_1.default.createElement(SemSelector_1.Selector, { onChange: (e) => {
                                console.log("channnn");
                                handleSelectCourses(e.target.id, e.target.value);
                            }, name: "course-select", id: course.courseId, key: course.courseId },
                            react_1.default.createElement("option", { value: "no" }, "No"),
                            react_1.default.createElement("option", { value: "yes" }, "Yes")))))))))));
}
exports.default = CustomTable;
