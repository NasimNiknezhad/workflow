"use client";
import { useFormState } from "react-dom";
import SubmitButton from "../SubmitButton";
import { addTask } from './NewTaskServerActions';
import { useEffect, useRef, useState } from "react";
import './taskForm.css';

export type  Project= {
  id: number;
  title: string;
}

export type  Status= {
  id: number;
  status: string;
}


export type TaskFormProps ={
  projectsList: Project[];
  statusList: Status[];

}

export default function TaskForm({ projectsList,statusList }: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null!);
  const [formState, formAction] = useFormState(addTask, {
    message: "",
    status: "",
  });


  return (
    <form className="create-task-form" action={formAction} ref={formRef}>
      <div className="inputs">
        <div>
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title" 
            required
          />
        </div>
        <div>
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description" 
          />
        </div>
        <div>
          <label htmlFor="projectId">Project</label>
          <select id="projectId" name="projectId" required>
            <option value="">Select a project</option>
            {projectsList.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>



        <div>
          <label htmlFor="statusId">Status</label>
          <select id="statusId" name="statusId" required>
            <option value="">Select status</option>
            {statusList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.status}
              </option>
            ))}
          </select>
        </div>


        
       
      </div>
      
      <SubmitButton readyContent={<strong>Add New Task!</strong>} />
      <strong className="message">{formState.message}</strong>
    </form>
  );
}
