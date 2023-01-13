import logo from './logo.svg';
import './css/App.css';
import { UseState } from './components/UseState';
import { ClassState } from './components/ClassState';

function App() {
  return (
    <div className="App">
     <UseState />
     <ClassState />
    </div>
  );
}

export default App;
