import { Link } from "react-router-dom";
import "./ExclusiveVideos.css";

const ExclusiveVideos = () => {
  const videos = [
    {
      id: 1,
      title: "Lamb (2021) Trailer",
      Image: "/Images/Lamb.png",
    },
    {
      id: 2,
      title: "The Suicide Squad : John Cena Interview",
      Image: "/Images/The-suicide-squad.png",
    },
    {
      id: 3,
      title: "Will there be a new era of horror?",
      Image: "/Images/Horror.png",
    },
  ];

  return (
    <section className="exclusive">
      <div className="section-header">
        <h2>Exclusive Videos</h2>
        <Link to="/exclusive">See more &gt;</Link>
      </div>

      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.Image} alt={video.title} loading="lazy" />

            <span className="video-play-icon">▶</span>

            <p className="video-title">{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveVideos;
