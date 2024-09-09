import {useState} from 'react';
import './UseState.css';

const UseState = () => {

  const [theme, setTheme] = useState('light');

  const setDark = () =>
    {
      setTheme('dark');
    }
  const setLight = () =>
    {
      setTheme('light');
    }
  const toggleTheme = () =>
    {
      if(theme == 'light')setTheme('dark');
      else setTheme('light');
    }
  const [counter, setCounter] = useState(0);

  const addCounter = () => 
    {
      setCounter(counter + 1)
    }
  const decrementCounter = () => 
    {
      setCounter(counter - 1)
    }
  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDark}>Dark</button>
      <button onClick={setLight}>Light</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h2>{counter}</h2>
      <button onClick={addCounter}>
        Increment
      </button>
      <button onClick={decrementCounter}>
        Decrement
      </button>
    </div>
  );
};

export default UseState;
