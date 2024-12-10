import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

interface CreateRoomProps {
  onRoomCreated: (
    roomId: string,
    joinUrl: string,
    encryptedPassword: string
  ) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onRoomCreated }) => {
  const [joinerPassword, setJoinerPassword] = useState<string>("");
  const [joinUrl, setJoinUrl] = useState<string | null>(null);

  const handleCreateRoom = () => {
    if (!joinerPassword) {
      alert("Please enter a password from the joiner.");
      return;
    }

    // Step 1: Generate a unique room ID
    const newRoomId = uuidv4(); // Unique ID for the room

    // Step 2: Encrypt the password provided by the joiner
    const encryptedPassword = CryptoJS.AES.encrypt(
      joinerPassword,
      newRoomId
    ).toString();

    // Step 3: Save the encrypted password in localStorage or any secure location (could be localStorage for simplicity)
    localStorage.setItem(newRoomId, encryptedPassword);

    // Step 4: Generate the join URL for the joiner
    const joinLink = `${window.location.origin}/join?roomId=${encodeURIComponent(newRoomId)}&password=${encodeURIComponent(encryptedPassword)}`;

    // Step 5: Set the join URL for the creator
    setJoinUrl(joinLink);

    // Step 6: Call the onRoomCreated function passed from the parent component
    onRoomCreated(newRoomId, joinLink, encryptedPassword);
  };

  return (
    <div className="create-room">
      <h2>Create a Room</h2>
      <label>
        Joiner Password:
        <input
          type="password"
          value={joinerPassword}
          onChange={(e) => setJoinerPassword(e.target.value)}
        />
      </label>
      <button onClick={handleCreateRoom}>Create Room</button>

      {joinUrl && (
        <div>
          <h3>Join URL for the Joiner</h3>
          <p>{joinUrl}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(joinUrl);
              alert("Join URL copied to clipboard!");
            }}
          >
            Copy Join URL
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
