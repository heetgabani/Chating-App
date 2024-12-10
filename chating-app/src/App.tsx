import React, { useState } from "react";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom";
import Room from "./Components/Room";
import "./styles.css";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"main" | "create" | "join" | "room">(
    "main"
  );
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const handleRoomCreated = (roomId: string) => {
    setCurrentRoomId(roomId);
    setScreen("room");
    alert(
      `Room created! Share this URL: ${window.location.href}?roomId=${roomId}`
    );
  };

  const handleAccessGranted = () => {
    setIsAccessGranted(true);
    setScreen("room");
  };

  return (
    <div className="app">
      {screen === "main" && (
        <div className="main-menu">
          <h1>Welcome to Chat Room</h1>
          <button onClick={() => setScreen("create")}>Create Room</button>
          <button onClick={() => setScreen("join")}>Join Room</button>
        </div>
      )}

      {screen === "create" && <CreateRoom onRoomCreated={handleRoomCreated} />}

      {screen === "join" && (
        <JoinRoom
          roomId={currentRoomId || ""}
          onAccessGranted={handleAccessGranted}
        />
      )}

      {screen === "room" && currentRoomId && <Room roomId={currentRoomId} />}
    </div>
  );
};

export default App;
