import { Navigate, useNavigate } from "react-router-dom";

export default function Skills({ result }) {
  // If user refreshes page or no data
  if (!result) return <Navigate to="/" />;

  const navigate = useNavigate();

  // Skills detected from resume (backend)
  const currentSkills = result.extractedSkills || [];

  // Missing skills from top recommended role
  const recommendedSkills =
    result.recommendedRoles?.[0]?.missingSkills || [];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Skills Recommendation 💡
        </h1>

        {/* CURRENT SKILLS */}
        <h2>Your Current Skills</h2>
        <div style={styles.skillBox}>
          {currentSkills.length > 0 ? (
            currentSkills.map((skill, index) => (
              <span key={index} style={styles.skillChip}>
                {skill}
              </span>
            ))
          ) : (
            <p>No skills detected</p>
          )}
        </div>

        {/* INFO MESSAGE */}
        <div style={styles.greenBox}>
          ** Our analysis says you are looking for{" "}
          {result.recommendedRoles[0].role.toUpperCase()} Jobs **
        </div>

        {/* RECOMMENDED SKILLS */}
        <h2>Recommended skills for you</h2>
        <div style={styles.skillBox}>
          {recommendedSkills.length > 0 ? (
            recommendedSkills.map((skill, index) => (
              <span key={index} style={styles.skillChipRed}>
                {skill}
              </span>
            ))
          ) : (
            <p>No recommendations 🎉</p>
          )}
        </div>

        <p style={{ color: "#666", marginTop: "10px" }}>
          Recommended skills generated from system
        </p>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate("/results")} style={{ padding: "10px 20px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Previous
          </button>
          <button onClick={() => navigate("/tips")} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#ffffff",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center"
  },

  container: {
    width: "100%",
    maxWidth: "900px"
  },

  title: {
    marginBottom: "30px"
  },

  skillBox: {
    background: "#f5f5f5",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px"
  },

  skillChip: {
    background: "#ff5b5b",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px"
  },

  skillChipRed: {
    background: "#ff4d4d",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px"
  },

  greenBox: {
    background: "#e9f9ec",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "25px"
  }
};
