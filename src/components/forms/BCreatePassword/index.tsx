import { createContext, useContext, useState } from "react";
import FormContainer from "../../form/FormContainer";
import Input from "../../form/Input";
import PasswordStrengthChecker from "./PasswordStrengthChecker";
import usePasswordStrengthChecker, { IPasswordStrengthChecker } from "./usePasswordStrengthChecker";
import { hasLowerCase, hasNumber, hasSpecialChar, hasUpperCase, isEigthChars } from "./utils/strengthChecker";
import { ethers } from "ethers";
import { useGS } from "../../../GlobalContext";
import Btn from "../../Btn";
import waitForLoading from "../../../utils/waitForLoading";
import BackBtn from "../../form/BackBtn";


// using context for ease of access in strength checker
interface IBCreatePasswordContext {
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    confirmPassword: string,
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
    confirmPasswordErrorMsg: string,
    setConfirmPasswordErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    passwordStrengthChecker: IPasswordStrengthChecker,
    setPasswordStrengthChecker: (updates: Partial<IPasswordStrengthChecker>) => void,
}

const BCreatePasswordContext = createContext<IBCreatePasswordContext>({
    password: "",
    setPassword: () => { },
    confirmPassword: "",
    setConfirmPassword: () => { },
    confirmPasswordErrorMsg: "",
    setConfirmPasswordErrorMsg: () => { },
    passwordStrengthChecker: {
        isEightChars: false,
        containsNumber: false,
        containsLowercaseLetter: false,
        containsUppercaseLetter: false,
        containsSpecialChar: false,
    },
    setPasswordStrengthChecker: () => { },
});

const BCreatePasswordContextProvider = BCreatePasswordContext.Provider;

const BCreatePasswordContextComponent = () => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState<string>("")
    const [passwordStrengthChecker, setPasswordStrengthChecker] = usePasswordStrengthChecker();


    return (
        <BCreatePasswordContextProvider value={{
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            confirmPasswordErrorMsg,
            setConfirmPasswordErrorMsg,
            passwordStrengthChecker,
            setPasswordStrengthChecker
        }}>
            <BCreatePassword />
        </BCreatePasswordContextProvider>
    );
};

export default BCreatePasswordContextComponent;

const useCreatePasswordContext = () => useContext(BCreatePasswordContext);
export { useCreatePasswordContext };

const BCreatePassword = () => {
    const {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        confirmPasswordErrorMsg,
        setConfirmPasswordErrorMsg,
        passwordStrengthChecker,
        setPasswordStrengthChecker,     
    } = useCreatePasswordContext();

    const gs = useGS();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value === confirmPassword) {
            setConfirmPasswordErrorMsg("")
        } else setConfirmPasswordErrorMsg("Passwords do not match")

        setPasswordStrengthChecker({
            isEightChars: isEigthChars(e.target.value),
            containsNumber: hasNumber(e.target.value),
            containsLowercaseLetter: hasLowerCase(e.target.value),
            containsUppercaseLetter: hasUpperCase(e.target.value),
            containsSpecialChar: hasSpecialChar(e.target.value),
        })
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)

        if (e.target.value === password) {
            setConfirmPasswordErrorMsg("")
        } else setConfirmPasswordErrorMsg("Passwords do not match")
    }

    const isCreateDisabled = () => {
        return !(
            Object.values(passwordStrengthChecker).every((val) => val) &&
            password === confirmPassword
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle disabled submissions outside of btn push (i.e input enter press)
        if (isCreateDisabled()) return;

        setIsLoading(true);

        await waitForLoading();

        if (!gs.state.isNewWalletImportedFromPhrase) {
            try {
                const wallet = ethers.Wallet.createRandom();

                if (!wallet.mnemonic) throw new Error("No mnemonic found on wallet");

                const walletWithProvider = wallet.connect(gs.infuraProvider!);

                gs.set({ wallets: [walletWithProvider] });

                const encryptedWallet = await wallet.encrypt(password);

                localStorage.setItem("eth-bag-wallets", JSON.stringify([encryptedWallet]));

                gs.set({
                    isLoading: false,
                    route: "save-mnemonic",
                    newWallet: wallet,
                });
            } catch (err) {
                console.error(err);
                gs.pushToast("Error creating wallet with password");                
            } finally {
                setIsLoading(false);
            }

            return;
        }

        try {
            // for TS - should never happen
            if (!gs.state.newWallet) throw new Error("No new wallet found");

            const encryptedWallet = await gs.state.newWallet.encrypt(password);

            const walletWithProvider = gs.state.newWallet.connect(gs.infuraProvider!);

            localStorage.setItem("eth-bag-wallets", JSON.stringify([encryptedWallet]));

            gs.set({
                newWallet: undefined,
                wallets: [walletWithProvider],
                route: "dashboard",
            });

        } catch (err) {
            console.error(err);
            gs.pushToast("Error creating wallet");
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <FormContainer onSubmit={handleSubmit}>
            <BackBtn />

            <h1>Create password</h1>
            <h2>This password will unlock your Eth
                {" wallet(s)"} only on this device</h2>
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <PasswordStrengthChecker />
            <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                errorMsg={confirmPasswordErrorMsg}
                containerStyle={{
                    marginTop: 0
                }}
            />
            <Btn
                txt={gs.state.isNewWalletImportedFromPhrase ? "Create Password" : "Create Wallet"}
                className="mt-24"
                isLoading={isLoading}
                disabled={isCreateDisabled()}
            />
        </FormContainer>
    )
}

