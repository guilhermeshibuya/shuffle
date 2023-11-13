import { createContext, useState } from "react";

const Player = createContext();

const PlayerContext = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <Player.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </Player.Provider>
  );
};

export { PlayerContext, Player };
