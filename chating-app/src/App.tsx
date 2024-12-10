import React, { useState } from "react";
import CreateRoom from "./Components/CreateRoom";
import JoinRoom from "./Components/JoinRoom";
import "./styles.css";

const App: React.FC = () => {
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [joinUrl, setJoinUrl] = useState<string | null>(null); // Used for displaying join URL
  const [, setEncryptedPassword] = useState<string>(""); // Used for password encryption

  const handleRoomCreated = (
    roomId: string,
    joinUrl: string,
    encryptedPassword: string
  ) => {
    setCurrentRoomId(roomId);
    setJoinUrl(joinUrl);
    setEncryptedPassword(encryptedPassword); // Set the encrypted password
    alert(`Room created! Share this URL: ${joinUrl}`);
  };

  const handleAccessGranted = () => {
    setIsAccessGranted(true);
  };

  return (
    <div className="app">
      {!currentRoomId ? (
        <CreateRoom onRoomCreated={handleRoomCreated} />
      ) : isAccessGranted ? (
        <div>Room {currentRoomId} is now accessible</div>
      ) : (
        <div>
          <JoinRoom
            roomId={
              new URLSearchParams(window.location.search).get("roomId") || ""
            }
            encryptedPassword={
              new URLSearchParams(window.location.search).get("password") || ""
            }
            onAccessGranted={handleAccessGranted}
          />
          {/* Display the join URL */}
          <div>
            {joinUrl && (
              <div>
                <p>Join URL:</p>
                <a href={joinUrl} target="_blank" rel="noopener noreferrer">
                  {joinUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
