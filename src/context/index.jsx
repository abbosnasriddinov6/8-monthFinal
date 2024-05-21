import React, { createContext, useState } from "react";
import { price24 } from "../pages/SingleCoin";
export const ProviderContext = createContext();
const Provider = ({ children }) => {
  const [dataTime, setdataTime] = useState(price24);
  const [value, setValue] = useState("usd");
  return (
    <ProviderContext.Provider
      value={{ dataTime, setdataTime, value, setValue }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default Provider;
