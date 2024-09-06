import ProjectForm from '@/components/project/ProjectForm'
import React from 'react'

export default function Create() {
  return (
    <>
    <div>Create New Project</div>
    <ProjectForm onProjectAdded={function (): void {
        throw new Error('Function not implemented.')
      } }></ProjectForm>
    </>
  )
}
