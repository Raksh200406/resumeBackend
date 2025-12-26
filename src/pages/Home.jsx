import heroImage from "../assets/images/hero-ai.png";
import { useNavigate } from "react-router-dom";

export default function Home({
  file,
  setFile,
  setResult,
  loading,
  setLoading,
  jobDescription,
  setJobDescription
}) {
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
    <div style={styles.page}>
      {/* HERO IMAGE */}
      <div style={styles.heroWrapper}>
        <img
          src={heroImage}
          alt="AI Resume Analyzer"
          style={styles.heroImage}
        />
      </div>

      {/* CONTENT */}
      <div style={styles.container}>
        <h1 style={styles.title}>Resume Analyzer</h1>

        <div style={styles.card}>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <textarea
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={styles.textarea}
          />

          <p style={styles.helperText}>
            Paste the job description of the role you are applying for.
            We will compare it with your resume and calculate skill match percentage.
          </p>

          <button onClick={handleSubmit} style={styles.button}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#E6D8C3",
    minHeight: "100vh"
  },

  heroWrapper: {
    width: "100%",
    padding: "30px 0",
    display: "flex",
    justifyContent: "center"
  },

  heroImage: {
    width: "92%",
    maxWidth: "1200px",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)"
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px"
  },

  card: {
    background: "#5D866C",
    padding: "25px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  helperText: {
    fontSize: "14px",
    color: "#222"
  },

  button: {
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
