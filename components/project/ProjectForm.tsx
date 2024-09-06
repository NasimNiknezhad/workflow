"use client";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { addProject } from "./newProjectServerActions";
import { useEffect, useRef } from "react";
import "./projectForm.css";


export default function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null!);
  const [formState, formAction] = useFormState(addProject, {
    message: "",
    status: "",
  });

  useEffect(() => {
    if (formState.status === "success") {
      formRef.current.reset();

    }
  }, [formState]);

  return (
    <form className="create-project-form" action={formAction} ref={formRef}>
      <div className="inputs">
        <div>
          <label htmlFor="title">Project Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Project Description</label>
          <textarea id="description" name="description" />
        </div>
      </div>

      <SubmitButton readyContent={<strong>Add New Project!</strong>} />
      <strong className="message">{formState.message}</strong>
    </form>
  );
}
