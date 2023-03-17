import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "Azul" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md my-4 py-5 px-32 bg-gradient-to-br from-cyan-500/80 to-blue-600/90 h-fit shadow-xl shadow-gray-900/60 rounded-md">
      <TopButtons />
      <Inputs />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" />
          <Forecast title="daily forecast" />
        </div>
      )}
    </div>
  );
}

export default App;
