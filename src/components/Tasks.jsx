import { useContext } from "react";
import NewTask from "./NewTask";
import { ProjectContext } from "../store/ProjectContextProvider";

export default function Tasks() {
  const { tasks, selectedProjectId, deleteTasks } = useContext(ProjectContext);
  const selectedTask = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedTask.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedTask.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedTask.map((task) => {
            return (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  onClick={() => deleteTasks(task.id)}
                  className="text-stone-700 hover:text-red-500"
                >
                  clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
