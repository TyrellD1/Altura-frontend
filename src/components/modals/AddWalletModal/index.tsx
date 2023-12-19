import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import BImportExisting from "../../forms/BImportExisting";
import CMnemonic from "../../forms/CMnemonic";
import { ethers } from "ethers";
import { useGS } from "../../../GlobalContext";
import Input from "../../form/Input";
import waitForLoading from "../../../utils/waitForLoading";
import Btn from "../../Btn";



const AddWalletModal = () => {
    type TStage = "start" | "new-wallet-password" | "import-existing" | "existing-wallet-password" | "recovery-phrase"
    
    const [stage, setStage] = useState<TStage>("start");

    const [password, setPassword] = useState<string>("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const gs = useGS();

    const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        await waitForLoading();

        if (stage === "existing-wallet-password") {
            try {
                if (!gs.state.newWallet) throw new Error("No new wallet found");
                
                const encryptedWallets = JSON.parse(localStorage.getItem("eth-bag-wallets") || "[]");
                try {
                    ethers.Wallet.fromEncryptedJsonSync(encryptedWallets[0], password);
                } catch (err) {
                    setPasswordErrorMsg("Invalid password");
                    return;
                }

                const encryptedWallet = await gs.state.newWallet?.encrypt(password);

                const walletWithProvider = gs.state.newWallet.connect(gs.infuraProvider!);

                const newWallets = [...gs.state.wallets];
                localStorage.setItem("eth-bag-wallets", JSON.stringify([...encryptedWallets, encryptedWallet]));

                gs.set({
                    wallets: [...newWallets, walletWithProvider],
                    modalRoute: "closed",
                })
            } catch (err) {
                gs.pushToast("Error adding wallet");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        const wallet = ethers.Wallet.createRandom();

        try {
            const encryptedWallets = JSON.parse(localStorage.getItem("eth-bag-wallets") || "[]");

            try {
                ethers.Wallet.fromEncryptedJsonSync(encryptedWallets[0], password);
            } catch (err) {
                setPasswordErrorMsg("Invalid password");
                return;
            }

            if (!wallet.mnemonic) throw new Error("No mnemonic found on wallet");

            gs.set({
                newWallet: wallet,
            })

            const encryptedWallet = await wallet.encrypt(password);

            localStorage.setItem("eth-bag-wallets", JSON.stringify([...encryptedWallets, encryptedWallet]));

            const walletWithProvider = wallet.connect(gs.infuraProvider!);

            const newWallets = [...gs.state.wallets];

            gs.set({
                wallets: [...newWallets, walletWithProvider],
            })

            setStage("recovery-phrase");

        } catch (err) {
            console.error(err);
            gs.pushToast("Error creating wallet");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {stage === "start" ? (
                <FormContainer>
                    <button className="btn-primary contained" onClick={() => setStage("new-wallet-password")}>Create New Wallet</button>
                    <button className="btn-primary mt-24" onClick={() => setStage("import-existing")}>Import Existing Wallet</button>
                </FormContainer>
            ) : stage === "import-existing" ? (
                <BImportExisting onSubmit={() => setStage("existing-wallet-password")} />
            ) : stage === "new-wallet-password" || stage === "existing-wallet-password" ? (
                <FormContainer onSubmit={onPasswordSubmit}>
                    <h1>New Wallet</h1>
                    <h2>{stage === "new-wallet-password" ? "Enter password to create wallet" : "Enter password to add wallet"}</h2>
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        errorMsg={passwordErrorMsg}
                    />
                    <Btn
                        txt={stage === "new-wallet-password" ? "Create Wallet" : "Add Wallet"}
                        className="mt-24"
                        isLoading={isLoading}
                    />
                    
                </FormContainer>
            ) : stage === "recovery-phrase" ? (
                <CMnemonic />
            ) : null}

        </>
    )
}

export default AddWalletModal;