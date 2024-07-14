import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/tasks';

const TaskForm = () => {

  const [task, setTask] = useState('');
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const addTask = () => {
    if (task.trim() !== "") {
      dispatch(createTask(user._id, { userId: user._id, task: task }))
      setTask("");
    }
  }

  return (
    <div className='task-form mb-3'>
      <input type='text' className="task-input mr-3" value={task} onChange={e => setTask(e.target.value)} />
      <button className='btn btn-primary task-button' onClick={addTask}>Add Task</button>
    </div>
  )
}

export default TaskForm
