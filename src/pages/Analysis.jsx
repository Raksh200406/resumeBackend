import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";

export default function Analysis() {
  const location = useLocation();
  const result = location.state?.result;
  const navigate = useNavigate();

  // If user opens /analysis directly
  if (!result) {
    return <Navigate to="/" />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Resume Analysis</h1>

        {/* Greeting */}
        <div style={styles.greeting}>
          Hello {result.user?.name || "User"}
        </div>

        {/* Basic Info */}
        <h2>Your Basic info</h2>

        <p><b>Name:</b> {result.user?.name || "N/A"}</p>
        <p><b>Email:</b> {result.user?.email || "N/A"}</p>
        <p><b>Contact:</b> {result.user?.phone || "N/A"}</p>
        <p><b>Resume pages:</b> {result.resumePages || "N/A"}</p>

        <p style={styles.level}>
          You are at intermediate level!
        </p>

        {/* Navigation */}
        <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate("/")} style={{ padding: "10px 20px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Previous
          </button>
          <button onClick={() => navigate("/results")} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
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
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  },

  container: {
    width: "100%",
    maxWidth: "800px"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px"
  },

  greeting: {
    background: "#739EC9",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px"
  },

  level: {
    color: "green",
    fontWeight: "bold",
    marginTop: "15px"
  }
};
