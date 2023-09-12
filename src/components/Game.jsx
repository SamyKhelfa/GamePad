import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/game.css";

const Game = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = "7c556f0fa4154bad8da30ff7dfa39d11";

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        console.log(response.data);
        console.log(id);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [API_KEY, id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="game-details">
      <h1>{data.name}</h1>
      <img src={data.background_image} alt={data.name} />
      <p>Description: {data.description}</p>
    </div>
  );
};

export default Game;
