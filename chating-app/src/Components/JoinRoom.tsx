import React, { useState } from "react";
import CryptoJS from "crypto-js";

interface JoinRoomProps {
  roomId: string;
  encryptedPassword: string;
  onAccessGranted: () => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({
  roomId,
  encryptedPassword,
  onAccessGranted,
}) => {
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleJoinRoom = () => {
    try {
      // Decrypt the password using the roomId as the key
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        roomId
      ).toString(CryptoJS.enc.Utf8);

      // Check if the provided password matches the decrypted password
      if (decryptedPassword === inputPassword) {
        onAccessGranted();
      } else {
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      alert("Error decrypting password. Please try again.");
    }
  };

  return (
    <div className="join-room">
      <h2>Join Room</h2>
      <label>
        Enter Password:
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </label>
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
