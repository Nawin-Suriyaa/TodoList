
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NavBar from './components/NavBar/NavBar';
import TasksWrapper from './components/TasksWrapper/TasksWrapper';

function App() {

  return (
    <div className="App">
      <BrowserRouter >
        <NavBar />
        <Routes>
            <Route path='/' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/tasks' Component={TasksWrapper} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
