import { useState } from "react";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function uploadFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setMsg(`✅ Uploaded (${data.chunks} chunks indexed)`);
    } catch {
      setMsg("❌ Upload failed");
    }

    setLoading(false);
  }

  return (
    <div style={styles.box}>
      <input type="file" accept=".pdf" onChange={uploadFile} />
      {loading && <p>⏳ Processing document...</p>}
      {msg && <p>{msg}</p>}
    </div>
  );
}

const styles = {
  box: {
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    borderRadius: "6px"
  }
};
