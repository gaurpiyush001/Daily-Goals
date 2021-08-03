import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/use-http';

function App() {

  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    
    const loadedTasks = [];

    console.log(tasksObj);
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);

  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
    {url : 'https://task-on-time-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json' },
    transformTasks,   
);

  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://task-on-time-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

      
  //     const loadedTasks = [];

  //     console.log(data);
  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    fetchTasks();
    console.log('fetch kinni');
  }, []);

  const taskAddHandler = (task) => {
    //console.log(tasks);
    setTasks((prevTasks) => prevTasks.concat(task));
    
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
