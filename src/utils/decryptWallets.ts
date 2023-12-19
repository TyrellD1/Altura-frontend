import { HDNodeWallet, ethers } from "ethers";
import { WebSocketProvider } from "ethers";


const decryptWallets = async (wallets: string[], password: string, provider: WebSocketProvider) => {
    try {
        const decryptedWallets: HDNodeWallet[] = [];
        for (const wallet of wallets) {
            const decryptedWallet = await ethers.Wallet.fromEncryptedJson(wallet, password);
            const connectedWallet = decryptedWallet.connect(provider);
            decryptedWallets.push(connectedWallet as HDNodeWallet);
        }

        return decryptedWallets;
    } catch (error: any) {
        throw new Error(error);   
    }
}

export default decryptWallets;