import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyData) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [tasks, setTasks] = useState([]);

    //we tweek the logic in below function to be more generic, Instead this Hook should be able to send any kind of request to any kind of URL and do any kind of Data Tranformation, But it should always manage the same state
    const sendRequest = useCallback( async (taskText=null) => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            // 'https://task-on-time-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
            requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                body: taskText ? JSON.stringify({text:taskText}): null,
                headers: requestConfig.headers ? requestConfig.headers: {},
            }
          );
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          //console.log(data);
    
          applyData( data , taskText );// we are Passing the data to function which we get from the component which uses this Costum Hook
          //console.log(data);

          //const loadedTasks = [];
    
        //   console.log(data);
        //   for (const taskKey in data) {
        //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        //   }
    
        //   setTasks(loadedTasks);
        } catch (err) {
          setError(err.message || 'Something went wrong!');
          console.error(err.message);
        }
        setIsLoading(false);
      }, [requestConfig,  applyData]);

    return {
        isLoading,
        error,
        sendRequest,
    };

};

export default useHttp;