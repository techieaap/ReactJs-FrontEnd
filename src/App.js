import "./App.css";
import { useState } from "react";



function App() {
  // Todo List App
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTasks = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTasks = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Weather App
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = () => {
    setLoading(true);
    setError('');

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6243aaf48b62471c43490a0d129cb8dc&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="app flex flex-col items-center">
      <div className="todo-list">
        <h1 className="text-4xl m-16 font-bold text-white">Todo List App</h1>
        <div className="p-6">
          <input
            className="bg-gray-200 rounded-md p-4 m-4"
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            placeholder="Create a new task"
          />

          <button
            onClick={addTasks}
            className="bg-gradient-to-r from-yellow-300 to-green-500 text-white p-3 m-3 rounded-md font-bold shadow-md hover:shadow-lgbg-gradient-to-r from-yellow-300 to-green-500 text-white p-3 m-3 rounded-md font-bold shadow-md hover:shadow-lgbg-gradient-to-r from-yellow-300 to-green-500 text-white p-3 m-3 rounded-md font-bold shadow-md hover:from-green-400 hover:to-green-600 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Add Tasks
          </button>
        </div>
        <div>
          {tasks?.length > 0 ? (
            <ul>
              {tasks.map((task, index) => (
                <div
                  className="flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md"
                  key={index}
                >
                  <li className="self-center font-semibold pr-10 mr-6 grow">
                    {task}
                  </li>
                  <button
                    onClick={() => {
                      deleteTasks(index);
                    }}
                    className="bg-red-500 text-white p-2 mx-1 rounded-md font-bold hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <div>
              <p class="text-center md:text-left text-white">No Task Found</p>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-4xl m-16 font-bold text-white">Search Weather</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            className="bg-gray-200 rounded-md p-4 m-4"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-300 to-green-500 text-white p-3 m-3 rounded-md font-bold shadow-md hover:from-green-400 hover:to-green-600 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Search
          </button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="custom-card bg-gradient-to-br from-black via-gray-800 to-gray-900 bg-opacity-80 text-white w-72 h-96 flex flex-col justify-center items-center mt-10 rounded-lg shadow-lg">
          <h4 className="text-2xl">{weather.name}</h4>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt=""
            className="w-[150px]"
          />
          <h2 className="text-5xl font-bold mb-2">{weather.main.temp}&deg;C</h2>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
