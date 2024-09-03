"use client";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { addTask } from './NewTaskServerActions';
import { useEffect, useRef } from "react";
import  './taskForm.css';


export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null!);
  const [formState, formAction] = useFormState(addTask, {
    message: "",
    status: "",
  });

  useEffect(() => {
    if (formState.status === "success") {
      formRef.current.reset();
    }
  }, [formState]);

  return (
    <form className="create-task-form" action={formAction} ref={formRef}>
      <div className="inputs">
        <div>
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title" // This corresponds to the task title
            required
          />
        </div>
        <div>
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description" // This corresponds to the task description
          />
        </div>
        <div>
          <label htmlFor="projectId">Project Name</label>
          <input
            type="number"
            id="projectId"
            name="projectId" // This corresponds to the ID of the project the task belongs to
            required
          />
        </div>
        <div>
          <label htmlFor="statusId">Status</label>
          <input
            type="number"
            id="statusId"
            name="statusId" // This corresponds to the ID of the task status
            required
          />
        </div>
      </div>
      
      <SubmitButton readyContent={<strong>Add New Task!</strong>} />
      <strong className="message">{formState.message}</strong>
    </form>
  );
}