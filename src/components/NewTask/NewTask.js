import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../Hooks/use-http';

const NewTask = (props) => {

  const evalData = (data, taskText=null) => {

      const generatedId = data.name; // firebase-specific => "name" contains generated id

      //console.log(data);
      //console.log(data.name);
      //console.log(taskText);
      
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);

  }


  const { isLoading, error, sendRequest } = useHttp({
    url: 'https://task-on-time-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
  }, evalData);

  function enterTaskHandler(taskText){
    sendRequest(taskText);
  };

 // enterTaskHandler(taskText);

  // const enterTaskHandler = async (taskText) => {

  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://task-on-time-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id

  //     console.log(data);
  //     console.log(data.name);
      
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
