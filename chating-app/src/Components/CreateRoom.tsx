import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

interface CreateRoomProps {
  onRoomCreated: (roomId: string, joinUrl: string) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onRoomCreated }) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [joinUrl, setJoinUrl] = useState<string | null>(null);

  const handleCreateRoom = () => {
    const newRoomId = uuidv4(); // Generate a unique room ID
    const password = "secretPassword"; // You can dynamically generate a secure password
    const encryptedRoomId = CryptoJS.AES.encrypt(
      newRoomId,
      password
    ).toString();

    // Store the encrypted room ID in localStorage with a key for password protection
    localStorage.setItem(
      encryptedRoomId,
      JSON.stringify({ hashedKey: password })
    );

    // Create the URL with encrypted room ID and password
    const joinLink = `${window.location.origin}/join?roomId=${encodeURIComponent(
      encryptedRoomId
    )}&password=${encodeURIComponent(password)}`;

    setRoomId(newRoomId);
    setJoinUrl(joinLink);
    onRoomCreated(newRoomId, joinLink);
  };

  const handleCopyJoinLink = () => {
    if (joinUrl) {
      navigator.clipboard
        .writeText(joinUrl)
        .then(() => alert("Join link copied to clipboard!"))
        .catch((err) => alert("Failed to copy join link."));
    }
  };

  return (
    <div className="create-room">
      <h2>Create a Room</h2>
      <button onClick={handleCreateRoom}>Create Room</button>
      {joinUrl && (
        <div className="join-url-display">
          <p>Share this link with the person joining: </p>
          <p>
            <strong>{joinUrl}</strong>
          </p>
          <button onClick={handleCopyJoinLink}>Copy Join Link</button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
