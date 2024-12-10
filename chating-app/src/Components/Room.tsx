import React, { useState } from "react";
import { validateKey } from "../utils/crypto";

interface JoinRoomProps {
  roomId: string;
  onAccessGranted?: () => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ roomId }) => {
  const [roomKey, setRoomKey] = useState("");

  const handleJoinRoom = () => {
    const roomData = localStorage.getItem(roomId);
    if (!roomData) {
      alert("Invalid room ID!");
      return;
    }

    const { hashedKey } = JSON.parse(roomData);
    if (validateKey(roomKey, hashedKey)) {
      onAccessGranted();
    } else {
      alert("Invalid key! Access denied.");
    }
  };

  return (
    <div className="join-room">
      <h2>Join Room</h2>
      <input
        type="text"
        placeholder="Enter the room key"
        value={roomKey}
        onChange={(e) => setRoomKey(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
};

export default JoinRoom;
function onAccessGranted() {
  throw new Error("Function not implemented.");
}
