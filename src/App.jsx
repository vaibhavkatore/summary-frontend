import Chat from "./components/Chat";
import FileUpload from "./components/FileUpload";

export default function App() {
  return (
    <div style={styles.container}>
      <h2>📄 Document Chat (Ollama)</h2>
      <FileUpload />
      <Chat />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif"
  }
};
