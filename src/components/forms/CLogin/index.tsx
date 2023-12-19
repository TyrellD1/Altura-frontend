import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import Input from "../../form/Input";
import { ethers } from "ethers";
import { useGS } from "../../../GlobalContext";
import decryptWallets from "../../../utils/decryptWallets";
import Btn from "../../Btn";
import waitForLoading from "../../../utils/waitForLoading";

const CLogin = () => {
    const [password, setPassword] = useState<string>("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const gs = useGS();

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordErrorMsg("");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return setPasswordErrorMsg("Password is required");

        setIsLoading(true);

        const wallets = JSON.parse(localStorage.getItem("eth-bag-wallets") || "[]");

        if (!wallets.length) return setPasswordErrorMsg("No wallets found");        

        // Could use web worker or rust to decrypt wallets
        // for times sake, running on single threaded JS - so ensuring UI switches to loading.        
        await waitForLoading();

        try {                        
            const decryptedWallets = await decryptWallets(wallets, password, gs.infuraProvider!);

            wallets.map((wallet: string) => {            
                const decryptedWallet = ethers.Wallet.fromEncryptedJsonSync(wallet, password);                
                const walletWithProvider = decryptedWallet.connect(gs.infuraProvider!);
                return walletWithProvider;
            });            

            gs.set({
                wallets: decryptedWallets,
                route: "dashboard",
                isLoading: false,
            })
        } catch (err) {
            console.error(err);
            setPasswordErrorMsg("Invalid password");            
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <div className="eth-gif-container">
                <img
                    className="eth-gif"
                    src="/imgs/eth.gif" alt="ethereum gif" />
            </div>
            <h1 className="mt-24">Welcome back!</h1>
            <h2>Enter your password to access your wallet</h2>
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                errorMsg={passwordErrorMsg}
            />            
            <Btn
                txt="Login"
                className="mt-24"
                isLoading={isLoading}
            />
        </FormContainer>
    )
}

export default CLogin;