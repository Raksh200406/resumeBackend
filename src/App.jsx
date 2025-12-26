import heroImage from "./assets/images/hero-ai.png";


import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";

import Tips from "./pages/Tips";
import Charts from "./pages/Charts";
import JobMatch from "./pages/JobMatch";




/* ================= APP ================= */

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
   const [jobDescription, setJobDescription] = useState("");

  return (
    <>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>Resume Analyzer</h2>
        <div>
          <Link style={styles.navLink} to="/">Home</Link>
          <Link style={styles.navLink} to="/analysis">Analysis</Link>
          <Link style={styles.navLink} to="/results">Results</Link>
          <Link style={styles.navLink} to="/skills">Skills</Link>
          <Link style={styles.navLink} to="/tips">Tips</Link>
          <Link style={styles.navLink} to="/charts">Charts</Link>
          <Link style={styles.navLink} to="/job-match">Job Match</Link>


        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              file={file}
              setFile={setFile}
              setResult={setResult}
              loading={loading}
              setLoading={setLoading}
              jobDescription={jobDescription}               
              setJobDescription={setJobDescription} 
            />
          }
        />

        <Route
          path="/analysis"
          element={<Analysis result={result} />}
        />

        <Route
          path="/results"
          element={<Results result={result} />}
        />

        <Route
          path="/skills"
          element={<div style={styles.pagePink}><div style={styles.container}><div style={{ ...styles.cardWhite, background: "#1C4D8D", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}><Skills result={result} /></div></div></div>}
        />
        <Route path="/tips" element={<div style={styles.pagePink}><div style={styles.container}><div style={{ ...styles.cardWhite, background: "#1C4D8D", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}><div style={{ color: "#fff" }}><Tips result={result} /></div></div></div></div>} />

        <Route path="/charts" element={<div style={styles.pagePink}><div style={styles.container}><div style={{ ...styles.cardWhite, background: "#1C4D8D", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}><div style={{ color: "#fff" }}><Charts result={result} /></div></div></div></div>} />

        <Route path="/job-match" element={<div style={styles.pagePink}><div style={styles.container}><div style={{ ...styles.cardWhite, background: "#1C4D8D", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}><div style={{ color: "#fff" }}><JobMatch result={result} jobDescription={jobDescription} /></div></div></div></div>} />



      </Routes>
    </>
  );
}

/* ================= HOME ================= */

function Home({ file, setFile, setResult, loading, setLoading, jobDescription, setJobDescription  }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
  if (!file) {
    alert("Please select a resume");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please paste the Job Description");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await fetch(
      "http://localhost:5000/api/resume/analyze",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();
    setResult(data);
    navigate("/analysis");
  } catch (err) {
    alert("Error analyzing resume");
  }

  setLoading(false);
};


  
  return (
    <div style={styles.pagePink}>
      <div style={styles.overlayContainer}>
        <h1 style={styles.overlayTitle}>Resume Analyzer</h1>

        <div style={{ ...styles.cardWhite, background: "#1C4D8D" }}>
          <div style={styles.uploadContainer}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />


             <textarea
              placeholder="Paste Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "10px",
                marginTop: "15px",
                borderRadius: "6px"
              }}
            />
            <p style={{ marginTop: "8px", color: "#fff", fontSize: "14px" }}>
            Paste the job description of the role you are applying for.
            We will compare it with your resume and calculate skill match percentage.
            </p>



            <button onClick={handleSubmit} style={styles.button}>
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <button onClick={() => navigate("/analysis")} style={styles.button}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= ANALYSIS ================= */

function Analysis({ result }) {
  if (!result) return <Navigate to="/" />;

  return (
    <div style={styles.pagePink}>
      <div style={{ ...styles.containerSmall, marginTop: "100px" }}>
        <div style={{ ...styles.cardWhite, background: "#1C4D8D", padding: "30px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
          <h1 style={{ ...styles.title, color: "#fff", textShadow: "none", marginBottom: "20px" }}>Resume Analysis</h1>

          <div style={styles.greenBox}>
            Hello {result.user?.name || "User"}
          </div>

          <h2 style={{ color: "#fff", marginTop: "20px" }}>Your Basic info</h2>

          <p style={{ color: "#fff" }}><b>Name:</b> {result.user?.name || "N/A"}</p>
          <p style={{ color: "#fff" }}><b>Email:</b> {result.user?.email || "N/A"}</p>
          <p style={{ color: "#fff" }}><b>Contact:</b> {result.user?.phone || "N/A"}</p>
          <p style={{ color: "#fff" }}><b>Resume pages:</b> {result.resumePages || "N/A"}</p>

          <p style={{ marginTop: "25px", color: "#333" }}>
            👉 Go to <Link to="/results" style={{ color: "#007bff", textDecoration: "underline" }}>Results</Link>
          </p>

          <h3 style={{ color: "green", marginTop: "20px" }}>
            You are at {result.level || "Intermediate"} level!
          </h3>
        </div>
      </div>
    </div>
  );
}

/* ================= RESULTS ================= */

function Results({ result }) {
  if (!result) return <Navigate to="/" />;

  const navigate = useNavigate();

  return (
    <div style={styles.pagePink}>
      <div style={styles.container}>
        <h1 style={{ ...styles.title, color: "#fff" }}>Analysis Results</h1>

        <div style={{ ...styles.cardWhite, background: "#1C4D8D" }}>
          <h2 style={{ color: "#fff" }}>Recommended Roles</h2>

          {result.recommendedRoles.map((role, index) => (
            <div key={index} style={{ marginBottom: "25px" }}>
              <h3 style={{ color: "#fff" }}>{role.role.toUpperCase()}</h3>

              <div style={styles.progressBg}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${role.matchPercentage}%`
                  }}
                />
              </div>

              <p style={{ color: "#fff" }}>Match: {role.matchPercentage}%</p>
              <p style={{ color: "#fff" }}>
                Missing Skills:{" "}
                {role.missingSkills.length
                  ? role.missingSkills.join(", ")
                  : "None 🎉"}
              </p>
            </div>
          ))}

          <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate("/analysis")} style={styles.buttonSecondary}>
              Previous
            </button>
            <button onClick={() => navigate("/skills")} style={styles.button}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SKILLS ================= */

function Skills({ result }) {
  if (!result) return <Navigate to="/" />;

  const currentSkills = result.extractedSkills || [];
  const recommendedSkills =
    result.recommendedRoles?.[0]?.missingSkills || [];
  const allRequiredSkills = [...currentSkills, ...recommendedSkills];

  return (
    <div>
      <h1 style={{ ...styles.title, color: "#fff" }}>Skills Recommendation 💡</h1>

      <h2 style={{ color: "#fff" }}>Skills Comparison: Resume vs Required Job Skills</h2>
      <div style={styles.skillBox}>
        {allRequiredSkills.length ? (
          allRequiredSkills.map((skill, i) => (
            <span key={i} style={{
              ...styles.skillTag,
              background: currentSkills.includes(skill) ? "#28a745" : "#dc3545"
            }}>
              {skill} ({currentSkills.includes(skill) ? "Matched" : "Missing"})
            </span>
          ))
        ) : (
          <p style={{ color: "#333" }}>No skills data available</p>
        )}
      </div>

      <div style={styles.greenBox}>
        ** Our analysis says you are looking for{" "}
        {result.recommendedRoles && result.recommendedRoles.length > 0 ? result.recommendedRoles[0].role.toUpperCase() : "Some"} Jobs **
      </div>

      <h2 style={{ color: "#fff" }}>Focus on Missing Skills</h2>
      <div style={styles.skillBox}>
        {recommendedSkills.map((skill, i) => (
          <span key={i} style={styles.skillTag}>
            {skill}
          </span>
        ))}
      </div>

      <p style={{ color: "#fff" }}>
        Recommended skills generated from system
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  nav: {
    padding: "16px 32px",
    background: "#94B4C1",
    display: "flex",
    justifyContent: "space-between"
  },
  navLink: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#fff",
    background: "#1C4D8D",
    padding: "8px 16px",
    borderRadius: "6px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    fontWeight: "bold"
  },
  pagePink: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: "100vh",
    padding: "30px 0",
    display: "flex",
    justifyContent: "center",
    position: 'relative'
  },
  pageWhite: {
    background: "#E6D8C3",
    minHeight: "100vh",
    padding: "30px 0",
    display: "flex",
    justifyContent: "center"
  },
  container: { maxWidth: "900px", width: "100%" },
  containerSmall: { maxWidth: "750px", width: "100%" },
  overlayContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    maxWidth: '700px',
    textAlign: 'center'
  },
  overlayTitle: {
    color: "#fff",
    marginBottom: "20px",
    fontSize: "40px",
    textShadow: "0 4px 12px rgba(0,0,0,0.8)"
  },
  title: { textAlign: "center", marginBottom: "25px" },
  cardWhite: {
    background: "#E6D8C3",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  uploadContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  button: {
    padding: "12px 24px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  buttonSecondary: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  greenBox: {
    background: "#fff",
    padding: "12px",
    borderRadius: "6px",
    margin: "15px 0",
    color: "#333"
  },
  progressBg: {
    height: "10px",
    background: "#e0e0e0",
    borderRadius: "10px"
  },
  progressBar: {
    height: "10px",
    background: "#5D866C",
    borderRadius: "10px"
  },
  skillBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px"
  },
  skillTag: {
    background: "#ff5c5c",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "16px",
    fontSize: "14px"
  }
};

export default App;
