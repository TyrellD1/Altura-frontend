import { ethers } from "ethers";

export const getProvider = (providerUrl: string) => {
  try {    
    const provider = new ethers.WebSocketProvider(providerUrl);
    return provider;
    
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
