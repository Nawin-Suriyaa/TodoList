import React, { useEffect } from 'react'
import { getTasks } from '../../actions/tasks';
import Task from "../Task/Task"
import TaskForm from '../TaskForm/TaskForm';
import { useDispatch, useSelector } from 'react-redux'
import "./TaskWrapper.css"
import { useNavigate } from 'react-router-dom';
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
        <h3 className='mb-3 header-left'>Hi {user.firstName} {user.lastName}, {getGreeting()}</h3>
        <TaskForm />
        {loading === true ? (

          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (tasks&& 
          tasks.map(task => (
            <Task task={task} key={task._id} />
          ))
        )
        }
      </div>
    </>
  )
}

export default TasksWrapper
