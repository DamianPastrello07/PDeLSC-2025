// Scoreboard.jsx
import React, { useEffect, useState } from "react";

export default function Scoreboard({ game }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch(`http://localhost:5000/api/scores/${game}`);
        const data = await res.json();
        setScores(data.scores || []);
      } catch (error) {
        console.error("Error al cargar los scores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, [game]);

  if (loading) return <p>Cargando puntajes...</p>;

  if (scores.length === 0) return <p>No hay puntajes aún para {game}</p>;

  return (
    <div className="scoreboard">
      <h4 className="mb-3 text-center">{game.toUpperCase()} Leaderboard</h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.user_name}</td>
              <td>{s.score}</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
