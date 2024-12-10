import React, { useState } from "react";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom";
import Room from "./Components/Room";
import "./styles.css";

const App: React.FC = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const handleRoomCreated = (roomId: string) => {
    setCurrentRoomId(roomId);
    alert(
      `Room created! Share this URL: ${window.location.href}?roomId=${roomId}`
    );
  };

  const handleAccessGranted = () => {
    setIsAccessGranted(true);
  };

  return (
    <div className="app">
      {!currentRoomId ? (
        <CreateRoom onRoomCreated={handleRoomCreated} />
      ) : isAccessGranted ? (
        <Room roomId={currentRoomId} />
      ) : (
        <JoinRoom
          roomId={currentRoomId}
          onAccessGranted={handleAccessGranted}
        />
      )}
    </div>
  );
};

export default App;
