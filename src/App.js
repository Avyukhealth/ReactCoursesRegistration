"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AdminPage_1 = __importDefault(require("./components/adminPage/AdminPage"));
const CourseRegistrationPage_1 = __importDefault(require("./components/registrationPage/CourseRegistrationPage"));
const CoursesPage_1 = __importDefault(require("./components/coursesPage/CoursesPage"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
function App() {
    const [theme, setTheme] = (0, react_1.useState)({ themeVal: "light" });
    function handleTheme() {
        console.log("inside");
        if (theme.themeVal === "light")
            setTheme({ themeVal: "dark" });
        else
            setTheme({ themeVal: "light" });
    }
    return (react_1.default.createElement("div", { className: "app", "data-testid": "app", "data-theme": theme.themeVal },
        react_1.default.createElement("div", { className: "Routes" },
            react_1.default.createElement(react_router_dom_2.BrowserRouter, null,
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_2.Route, { path: "/myCourses", element: react_1.default.createElement(CoursesPage_1.default, null) }),
                    react_1.default.createElement(react_router_dom_2.Route, { path: "/admin", element: react_1.default.createElement(AdminPage_1.default, null) }),
                    react_1.default.createElement(react_router_dom_2.Route, { path: "/*", element: react_1.default.createElement(CourseRegistrationPage_1.default, null) })))),
        react_1.default.createElement("div", { className: "theme-button" },
            react_1.default.createElement("button", { onClick: handleTheme, className: "theme-button-main" }, "Change Theme"))));
}
exports.default = App;
