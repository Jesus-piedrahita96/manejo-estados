import './css/App.css';
import { UseState } from './components/UseState';
import { UseReducer } from './components/UseReducer';
import { ClassState } from './components/ClassState';

function App() {
  return (
    <div className="App">
      <UseState name='Use State'/>
      <ClassState name='Class State'/>
      <UseReducer name='Use Reducer' />
    </div>
  );
}

export default App;
