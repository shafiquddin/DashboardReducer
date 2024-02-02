import { createContext, useReducer, useState } from "react";

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addProject: () => {},
  cancelProject: () => {},
  deleteProject: () => {},
  addTasks: () => {},
  deleteTasks: () => {},
  startAddProject: () => {},
  selectedProject: () => {},
});

const projectReducer = (state, action) => {
  if (action.type === "AddTasks") {
    const taskId = Math.random();
    const newTask = {
      text: action.payload,
      id: taskId,
      projectId: state.selectedProjectId,
    };
    return {
      ...state,
      tasks: [newTask, ...state.tasks],
    };
  }
  if (action.type === "DeleteTask") {
    return {
      ...state,
      selectedTaskId: undefined,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  }
  if (action.type === "StartAddProject") {
    return {
      ...state,
      selectedProjectId: null,
    };
  }
  if (action.type === "SelectedProject") {
    return {
      ...state,
      selectedProjectId: action.payload,
    };
  }
  if (action.type === "AddProject") {
    const projectId = Math.random();
    const newProject = {
      ...action.payload,
      id: projectId,
    };
    return {
      ...state,
      selectedProjectId: undefined,
      projects: [...state.projects, newProject],
    };
  }
  if (action.type === "CancelProject") {
    return {
      ...state,
      selectedProjectId: undefined,
    };
  }
  if (action.type === "DeleteProject") {
    return {
      ...state,
      selectedProjectId: undefined,
      projects: state.projects.filter(
        (project) => project.id !== state.selectedProjectId
      ),
    };
  }
  return state;
};

const ProjectContextProvider = ({ children }) => {
  const [projectState, projectDispatch] = useReducer(projectReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTasks = (text) => {
    projectDispatch({
      type: "AddTasks",
      payload: text,
    });
  };

  const handleDeleteTasks = (id) => {
    projectDispatch({
      type: "DeleteTask",
      payload: id,
    });
  };

  const handleStartAddProject = () => {
    projectDispatch({
      type: "StartAddProject",
    });
  };

  const handleSelectedProject = (id) => {
    projectDispatch({
      type: "SelectedProject",
      payload: id,
    });
  };

  const handleAddProject = (projectData) => {
    projectDispatch({
      type: "AddProject",
      payload: projectData,
    });
  };

  const handleCancelProject = () => {
    projectDispatch({
      type: "CancelProject",
    });
  };

  const handleDeleteProject = () => {
    projectDispatch({
      type: "DeleteProject",
    });
  };

  const ctxValue = {
    projects: projectState.projects,
    selectedProjectId: projectState.selectedProjectId,
    tasks: projectState.tasks,
    addProject: handleAddProject,
    cancelProject: handleCancelProject,
    deleteProject: handleDeleteProject,
    addTasks: handleAddTasks,
    deleteTasks: handleDeleteTasks,
    startAddProject: handleStartAddProject,
    selectedProject: handleSelectedProject,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
