import React from "react";
import { CourseRegistrationActionHandler } from "./CourseRegistrationActionHandler";
import CourseRegistration from "./CourseRegistrationPage";

export default function CourseRegisttrationContainer(props: any) {
  return <>
    <CourseRegistrationActionHandler>
      {({ state, onAction }: { state: any, onAction: any }) => {
        return < CourseRegistration state={state} onAction={onAction} />;
      }}
    </CourseRegistrationActionHandler>
  </>;
}
