import { Link } from "react-router-dom";
import "./FeaturedCasts.css";

const FeaturedCasts = () => {
  const casts = [
    { id: 1, name: "Keanu Reeves", image: "/Images/Keanu.png" },
    { id: 2, name: "Ryan Reynolds", image: "/Images/Ryan.png" },
    { id: 3, name: "Timothée Chalamet", image: "/Images/Timothee.png" },
    { id: 4, name: "Chloë Grace Moretz", image: "/Images/Chloe.png" },
  ];

  return (
    <section className="casts">
      <div className="section-header">
        <h2>Featured Casts</h2>
        <Link to="/casts">See more &gt;</Link>
      </div>

      <div className="cast-container">
        {casts.map((cast) => (
          <div key={cast.id} className="cast-card">
            <img src={cast.image} alt={cast.name} loading="lazy" />
            <p className="cast-name">{cast.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCasts;
