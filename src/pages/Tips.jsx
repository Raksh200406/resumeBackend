import { Navigate, useNavigate } from "react-router-dom";

export default function Tips({ result }) {
  if (!result) return <Navigate to="/" />;

  const navigate = useNavigate();

  const checks = result.resumeChecks || {
    objective: true,
    education: true,
    experience: true,
    internships: true,
    skills: true,
    hobbies: false,
    interests: false,
    achievements: false,
    certifications: false,
    projects: true
  };

  const score = result.resumeScore || 66;

  const renderItem = (ok, text) => (
    <p style={{ color: ok ? "yellow" : "black" }}>
      {ok ? "[+] Awesome! You have added " : "[-] Please add "}
      {text}
    </p>
  );

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Resume Tips & Ideas 💡</h1>

      {renderItem(checks.objective, "Objective / Summary")}
      {renderItem(checks.education, "Education Details")}
      {renderItem(checks.experience, "Experience")}
      {renderItem(checks.internships, "Internships")}
      {renderItem(checks.skills, "Skills")}
      {renderItem(checks.hobbies, "Hobbies")}
      {renderItem(checks.interests, "Interests")}
      {renderItem(checks.achievements, "Achievements")}
      {renderItem(checks.certifications, "Certifications")}
      {renderItem(checks.projects, "Projects")}

      <h2 style={{ marginTop: "40px", color: "#000" }}>Resume Score 📝</h2>

      <div style={{ height: "12px", background: "#eee", borderRadius: "6px" }}>
        <div
          style={{
            width: `${score}%`,
            height: "12px",
            background: "#e53935",
            borderRadius: "6px"
          }}
        />
      </div>

      <p style={{ background: "#fff", padding: "10px", marginTop: "15px", color: "#000" }}>
        <b>Your Resume Writing Score: {score}%</b>
      </p>

      <p style={{ fontSize: "14px", color: "#000" }}>
        Note: This score is calculated based on the content in your resume.
      </p>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/skills")} style={{ padding: "10px 20px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Previous
        </button>
        <button onClick={() => navigate("/charts")} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Next
        </button>
      </div>
      
    </div>
  );
}
