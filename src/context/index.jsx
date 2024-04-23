import { createContext, useState } from "react";
export const Audioprovider = createContext();
function AudioProps({ children }) {
  const [audio, setAudio] = useState(null);

  return (
    <>
      <Audioprovider.Provider
        value={{
          audio,
          setAudio,
        }}
      >
        {children}
      </Audioprovider.Provider>
    </>
  );
}

export default AudioProps;
