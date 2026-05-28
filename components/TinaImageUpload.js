import React, { useState } from "react";

export default function TinaImageUpload({ onFileAccepted }) {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const maxSize = 200 * 1024; // 200KB

  function sanitizeName(name) {
    return name.replace(/[^a-z0-9.\-_]/gi, "").toLowerCase();
  }

  function handleChange(e) {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    // Type check
    if (file.type !== "image/jpeg") {
      setError("Only JPEG files are allowed.");
      e.target.value = "";
      return;
    }

    // Size check
    if (file.size > maxSize) {
      setError("File must be less than 200KB.");
      e.target.value = "";
      return;
    }

    // Filename check
    const sanitized = sanitizeName(file.name);
    if (sanitized !== file.name) {
      setError(
        "Filename must be lowercase and contain only letters, numbers, dashes, underscores, or periods."
      );
      e.target.value = "";
      return;
    }

    setFileName(sanitized);
    if (onFileAccepted) onFileAccepted(file, sanitized);
  }

  return (
    <div>
      <label htmlFor="tina-image-upload">Upload JPEG image (max 200KB):</label>
      <input
        id="tina-image-upload"
        type="file"
        accept=".jpeg,.jpg"
        onChange={handleChange}
      />
      {fileName && <div>Accepted file: {fileName}</div>}
      {error && (
        <div
          style={{
            color: "#fff",
            background: "#d32f2f",
            borderRadius: "6px",
            padding: "8px 16px",
            margin: "12px auto",
            maxWidth: "400px",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            textAlign: "center",
            display: "block",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
