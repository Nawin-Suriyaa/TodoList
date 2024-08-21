import React, { useEffect } from 'react'
import { getTasks } from '../../actions/tasks';
import Task from "../Task/Task"
import { useDispatch, useSelector } from 'react-redux'
import "./TasksHistory.css"
import { useNavigate } from 'react-router-dom';
import backicon from "../../assets/images/back.svg";
const TasksHistory = () => {

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

  return (
    <>
      <div className='tasks-container-history'>
        <span className="headingSpan-history">
              <img
                src={backicon}
                width="30"
                height="30"
                className="d-inline-block align-top headerMargin"
                alt="icon"
                onClick={() => navigate("/tasks")}
              /> &nbsp;&nbsp;&nbsp;
              <h3 className=''>History</h3>
        </span>
        {loading === true ? (

          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (tasks&& 
          tasks
          .filter(task => task.isComplete)
          .map(task => (
            <Task task={task} key={task._id} />
          ))
        )
        }
      </div>
    </>
  )
}

export default TasksHistory