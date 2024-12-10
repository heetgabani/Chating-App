import React, { useState } from "react";
import CryptoJS from "crypto-js";

interface JoinRoomProps {
  roomId: string;
  password: string;
  onAccessGranted: () => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({
  roomId,
  password,
  onAccessGranted,
}) => {
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleJoinRoom = () => {
    try {
      const decryptedRoomId = CryptoJS.AES.decrypt(roomId, password).toString(
        CryptoJS.enc.Utf8
      );

      if (decryptedRoomId) {
        const storedRoom = localStorage.getItem(decryptedRoomId);
        if (!storedRoom) {
          alert("Room does not exist!");
          return;
        }
        onAccessGranted();
      } else {
        alert("Invalid room ID or password.");
      }
    } catch (error) {
      alert("Failed to join room. Incorrect password.");
    }
  };

  return (
    <div className="join-room">
      <h2>Join Room</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
