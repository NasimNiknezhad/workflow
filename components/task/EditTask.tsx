
import type { Comment } from "../../types/projectType";
import React, { useRef } from 'react'
import SubmitButton from '../SubmitButton';
import { useFormState } from 'react-dom';
import { addTask } from './NewTaskServerActions';

export type Status ={
    id: number,
    status:string;
}


type EditTaskProps = {
    taskId: number ,
    title:string,
    description:string,
    project:string,
    user :string, // creator
    assignedUser:string,
    status:string,
    statusList: Status[];
    taskComments:Comment[]
}







export default async function EditTask (taskDetails: EditTaskProps) {

    const formRef = useRef<HTMLFormElement>(null!);
    const [formState, formAction] = useFormState(addTask, {
      message: "",
      status: "",
    });
  


  return (
  <form className="create-task-form" action={formAction} ref={formRef}>
      <article className="task-view">
        <div className="project-name">
          <p><strong>Project Name:</strong> {taskDetails.title}</p>
        </div>

        <div className="task-name">
          <p><strong>Task Name:</strong> {taskDetails.title}</p>
        </div>

        <div className="task-meta">
          <div className="creator">
            <p><strong>Creator:</strong> {taskDetails.user}</p>
          </div>
          <div className="assigned-to">
            <p><strong>Assigned to:</strong> {taskDetails.assignedUser}</p>
          </div>
        </div>

        <div className="task-description">
          <p><strong>Task Description:</strong> {taskDetails.description}</p>
        </div>

        <div className="task-status">
          <p><strong>Status:</strong> {taskDetails.status }</p>
        </div>

        <div className="task-comments">
          <p><strong>Comments:</strong></p>
          {taskDetails.taskComments.length > 0 ? (
            taskDetails.taskComments.map((comment) => (
              <div key={comment.id} className="comment">
                <p> wrote:</p>
                <p>{comment.description || 'No comment provided'}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </article>
      <SubmitButton readyContent={<strong>Save</strong>} />

    </form>
  );
}
