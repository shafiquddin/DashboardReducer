import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { useContext } from "react";
import SelectedProject from "./components/SelectedProject";
import { ProjectContext } from "./store/ProjectContextProvider";

function App() {
  const { selectedProjectId } = useContext(ProjectContext);
  let content = <SelectedProject />;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;
