import { ProjectProvider } from './context/ProjectProvider';
import { TabLayout } from './components/TabLayout';

function App() {
  return (
    <ProjectProvider>
      <TabLayout />
    </ProjectProvider>
  );
}

export default App;
