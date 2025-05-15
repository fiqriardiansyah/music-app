import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

export const AppContext = createContext({});

export type Music = { name: string; artist: string; cover: string };

export type AppContextType = {
  activeMusic: Music | null;
  setActiveMusic: Dispatch<SetStateAction<Music | null>>;
  activeMusicSide: Music | null;
  setActiveMusicSide: Dispatch<SetStateAction<Music | null>>;
};

const AppProvider = ({ children }: { children: ReactElement }) => {
  const [activeMusic, setActiveMusic] = useState<Music | null>(null);
  const [activeMusicSide, setActiveMusicSide] = useState<Music | null>(null);

  return (
    <AppContext.Provider
      value={{
        activeMusic,
        setActiveMusic,
        activeMusicSide,
        setActiveMusicSide,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
