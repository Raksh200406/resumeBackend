import { Navigate } from "react-router-dom";

export default function JobMatch({ result }) {
  if (!result) return <Navigate to="/" />;

  const match = result.jobMatch;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Job Match Analysis 📄</h1>

      <h2>Matching Skills Percentage</h2>

      <div style={{ height: "12px", background: "#eee", borderRadius: "6px" }}>
        <div
          style={{
            width: `${match.matchPercentage}%`,
            height: "12px",
            background: "#4caf50",
            borderRadius: "6px"
          }}
        />
      </div>

      <p style={{ marginTop: "10px" }}>
        <b>Match:</b> {match.matchPercentage}%
      </p>

      <h3>Matched Skills ✅</h3>
      <p>{match.matchedJDskills.join(", ") || "None"}</p>

      <h3>Missing Skills ❌</h3>
      <p>{match.missingJDskills.join(", ") || "None 🎉"}</p>
    </div>
  );
}
