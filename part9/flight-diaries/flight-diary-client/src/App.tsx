import { useState, useEffect } from "react";
import axios from "axios";
import { Diary, NewDiary } from "./types";
import { createDiary, getAllDiaries /* createDiary */ } from "./diaryService";

function App() {
  //update
  const [error, setError] = useState<string>();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({});
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
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

  return (
    <div className="App">
      {error && <div className="error">Error: {error}</div>}
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
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
