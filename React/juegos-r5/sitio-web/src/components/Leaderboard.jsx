import React, { useState, useEffect } from 'react';

const Leaderboard = ({ game, top = 5, title }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/score/top/${game}?top=${top}`);
        const data = await response.json();

        if (data.status !== 'success' || !Array.isArray(data.leaderboard)) {
          throw new Error(`Respuesta inesperada del servidor`);
        }

        setScores(data.leaderboard);
      } catch (err) {
        console.error(`Error cargando leaderboard de ${game}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [game, top]);

  if (loading) return <p>Cargando leaderboard...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 bg-black text-white mb-4">
      <h4 className="fw-bold text-center mb-3">
        {title || `Leaderboard - ${game}`}
      </h4>

      {scores.length === 0 ? (  
        <p className="text-muted text-center">No hay datos disponibles</p>
      ) : (
        <ol className="list-group list-group-numbered">
          {scores.map((item, index) => (
            <li 
              key={index} 
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="fw-semibold">{item.user_name}</span>
              <span className="badge bg-dark rounded-pill">{item.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
