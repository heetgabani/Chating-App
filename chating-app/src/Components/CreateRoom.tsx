import React, { useState } from "react";
import { hashKey } from "../utils/crypto";

interface CreateRoomProps {
  onRoomCreated: (roomId: string, hashedKey: string) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onRoomCreated }) => {
  const [roomKey, setRoomKey] = useState("");

  const handleCreateRoom = () => {
    if (!roomKey.trim()) {
      alert("Please enter a room key!");
      return;
    }

    const roomId = `room-${Date.now()}`;
    const hashedKey = hashKey(roomKey);

    localStorage.setItem(
      roomId,
      JSON.stringify({
        hashedKey,
        messages: [],
      })
    );

    onRoomCreated(roomId, hashedKey);
  };

  return (
    <div className="create-room">
      <h2>Create a Room</h2>
      <input
        type="text"
        placeholder="Enter a room key"
        value={roomKey}
        onChange={(e) => setRoomKey(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default CreateRoom;
