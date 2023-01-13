import './css/App.css';
import { UseState } from './components/UseState';
import { ClassState } from './components/ClassState';

function App() {
  return (
    <div className="App">
     <UseState name='Use State'/>
     <ClassState name='Class State'/>
    </div>
  );
}

export default App;
