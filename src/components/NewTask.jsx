import { useContext } from "react";
import { useState } from "react";
import { ProjectContext } from "../store/ProjectContextProvider";

export default function NewTask() {
  const [enteredText, setEnteredText] = useState("");
  const { addTasks } = useContext(ProjectContext);

  const handleChangeText = (event) => {
    setEnteredText(event.target.value);
  };

  const HandleAddTask = () => {
    if (enteredText.trim() === "") {
      return;
    }
    addTasks(enteredText);
    setEnteredText("");
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChangeText}
        value={enteredText}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={HandleAddTask}
      >
        Add Task
      </button>
    </div>
  );
}
