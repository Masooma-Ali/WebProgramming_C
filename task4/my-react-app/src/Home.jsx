import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>This is a modern React application with routing.</p>

      <button 
        className="btn"
        onClick={() => navigate("/contact")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;