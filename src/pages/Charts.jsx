import { Navigate, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ result }) {
  if (!result) return <Navigate to="/" />;

  const navigate = useNavigate();

  /* ===== PIE 1: FIELD RECOMMENDATION ===== */
  const roles = result.recommendedRoles.slice(0, 4);

  const fieldData = {
    labels: roles.map(r => r.role),
    datasets: [
      {
        data: roles.map(r => r.matchPercentage),
        backgroundColor: [
          "#e6f56a",
          "#9ad98b",
          "#66c2a5",
          "#3288bd"
        ],
        borderWidth: 1
      }
    ]
  };

  /* ===== PIE 2: EXPERIENCE LEVEL ===== */
  const level = result.level;

  const levelData = {
    labels: ["Beginner", "Intermediate", "Experienced"],
    datasets: [
      {
        data: [
          level === "Beginner" ? 100 : 0,
          level === "Intermediate" ? 100 : 0,
          level === "Advanced" ? 100 : 0
        ],
        backgroundColor: ["#fbb4ae", "#b2182b", "#7f0000"]
      }
    ]
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>
        Visual Resume Analysis 📊
      </h1>

      {/* ===== FIELD PIE ===== */}
      <h2 style={{ marginTop: "40px", textAlign: "center" }}>
        Pie-Chart for Predicted Field Recommendation
      </h2>

      <div style={{ width: "400px", margin: "auto" }}>
        <Pie data={fieldData} />
      </div>

      {/* ===== LEVEL PIE ===== */}
      <h2 style={{ marginTop: "60px", textAlign: "center" }}>
        Pie-Chart for User's Experienced Level
      </h2>

      <div style={{ width: "400px", margin: "auto" }}>
        <Pie data={levelData} />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start" }}>
        <button onClick={() => navigate("/tips")} style={{ padding: "10px 20px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Previous
        </button>
      </div>
    </div>
  );
}
