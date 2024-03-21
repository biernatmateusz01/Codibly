import AppView from './components/AppView';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from './context/dataContext'

function App() {
  return (
    <DataProvider>
      <AppView />
    </DataProvider>
  );
}

export default App