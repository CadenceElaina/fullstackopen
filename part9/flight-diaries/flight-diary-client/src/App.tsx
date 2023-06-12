import { useState, useEffect } from "react";
import axios from "axios";
import { Diary, NewDiary } from "./types";
import { createDiary, getAllDiaries /* createDiary */ } from "./diaryService";

interface radioInput {
  label: string;
  value: string;
  checked: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function App() {
  //update
  const [error, setError] = useState<string>();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({});
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
      //console.log(data);
    });
  }, []);

  // Clear notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(undefined);
    }, 7500);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // const id = diaries.length + 1;
    try {
      const data = await createDiary({ date, visibility, weather, comment });
      setDiaries(diaries.concat(data));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  //https://dev.to/diraskreact/simple-way-to-use-multiple-radio-buttons-in-react-32df
  const RadioInput = ({ label, value, checked, setter }: radioInput) => {
    return (
      <label>
        <input
          type="radio"
          checked={checked == value}
          onChange={() => setter(value)}
        />
        <span>{label}</span>
      </label>
    );
  };

  return (
    <div className="App">
      {error && <div className="error">Error: {error}</div>}
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <div>
            <RadioInput
              label="good"
              value="good"
              checked={visibility}
              setter={setVisibility}
            />
          </div>
          <div>
            <RadioInput
              label="ok"
              value="ok"
              checked={visibility}
              setter={setVisibility}
            />
          </div>
          <div>
            <RadioInput
              label="poor"
              value="poor"
              checked={visibility}
              setter={setVisibility}
            />
          </div>
        </div>
        <fieldset>
          <div>
            weather
            <RadioInput
              label="sunny"
              value="sunny"
              checked={weather}
              setter={setWeather}
            />
            <RadioInput
              label="rainy"
              value="rainy"
              checked={weather}
              setter={setWeather}
            />
            <RadioInput
              label="cloudy"
              value="cloudy"
              checked={weather}
              setter={setWeather}
            />
            <RadioInput
              label="stormy"
              value="stormy"
              checked={weather}
              setter={setWeather}
            />
            <RadioInput
              label="windy"
              value="windy"
              checked={weather}
              setter={setWeather}
            />
          </div>
        </fieldset>
        comment
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">create diary</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.date}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
