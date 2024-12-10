import React, { useState } from "react";

interface JoinRoomProps {
  roomId: string;
  onAccessGranted: () => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ roomId, onAccessGranted }) => {
  const [roomKey, setRoomKey] = useState("");

  const handleJoinRoom = () => {
    const roomData = localStorage.getItem(roomId);
    if (!roomData) {
      alert("Room ID not found!");
      return;
    }

    const { hashedKey } = JSON.parse(roomData);
    if (roomKey === hashedKey) {
      onAccessGranted();
    } else {
      alert("Invalid room key!");
    }
  };

  return (
    <div className="join-room">
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Enter room key"
        value={roomKey}
        onChange={(e) => setRoomKey(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
};

export default JoinRoom;
