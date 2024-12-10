import React, { useState } from "react";

interface CreateRoomProps {
  onRoomCreated: (roomId: string) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onRoomCreated }) => {
  const [roomId, setRoomId] = useState<string | null>(null);

  const handleCreateRoom = () => {
    const newRoomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(
      newRoomId,
      JSON.stringify({ hashedKey: "defaultKey" })
    );
    setRoomId(newRoomId);
    onRoomCreated(newRoomId);
  };

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard
        .writeText(roomId)
        .then(() => alert("Room ID copied to clipboard!"))
        .catch((err) => alert("Failed to copy room ID."));
    }
  };

  return (
    <div className="create-room">
      <h2>Create a Room</h2>
      <button onClick={handleCreateRoom}>Create Room</button>
      {roomId && (
        <div className="room-id-display">
          <p>
            Room ID: <strong>{roomId}</strong>
          </p>
          <button onClick={handleCopyRoomId}>Copy Room ID</button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
