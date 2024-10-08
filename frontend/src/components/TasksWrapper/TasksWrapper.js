import React, { useEffect } from 'react'
import { getTasks } from '../../actions/tasks';
import Task from "../Task/Task"
import TaskForm from '../TaskForm/TaskForm';
import { useDispatch, useSelector } from 'react-redux'
import "./TaskWrapper.css"
import { useNavigate } from 'react-router-dom';
import historyicon from "../../assets/images/history.jpg";
const TasksWrapper = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.tasks)
  const { user } = useSelector(state => state.user)
  const { message: addMsg } = useSelector(state => state.createTask)
  const { message: updateMsg } = useSelector(state => state.updateTask)
  const { message: deleteMsg } = useSelector(state => state.deleteTask)



  useEffect(() => {

    if (!user.email) {
      navigate("/")
    }
  
    dispatch(getTasks(user._id))
  }, [addMsg, updateMsg, deleteMsg, user, dispatch,navigate])

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <div className='tasks-container'>
        <span className="headingSpan">
            <h3>Hi {user.firstName} {user.lastName}, {getGreeting()}</h3>
            <img
              src={historyicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="icon"
              onClick={() => navigate("/history")}
            />
        </span>
        <TaskForm />
        {loading === true ? (

          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (tasks&& 
          tasks
          .filter(task => !task.isComplete)
          .map(task => (
            <Task task={task} key={task._id} />
          ))
        )
        }
      </div>
    </>
  )
}

export default TasksWrapper