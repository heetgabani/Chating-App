import React, { useState } from "react";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom";
import "./styles.css";

const App: React.FC = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const handleRoomCreated = (roomId: string, joinUrl: string) => {
    setCurrentRoomId(roomId);
    setJoinUrl(joinUrl);
    alert(`Room created! Share this URL with others: ${joinUrl}`);
  };

  const handleAccessGranted = () => {
    setIsAccessGranted(true);
  };

  return (
    <div className="app">
      {!currentRoomId ? (
        <CreateRoom onRoomCreated={handleRoomCreated} />
      ) : isAccessGranted ? (
        <div>Room ID {currentRoomId} is now accessible</div>
      ) : (
        <JoinRoom
          roomId={
            new URLSearchParams(window.location.search).get("roomId") || ""
          }
          password={
            new URLSearchParams(window.location.search).get("password") || ""
          }
          onAccessGranted={handleAccessGranted}
        />
      )}
    </div>
  );
};

export default App;
