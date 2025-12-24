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
    width: "100vw",
    fontFamily: "Arial, sans-serif"
  }
};
