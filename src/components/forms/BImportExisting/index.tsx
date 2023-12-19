import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import Input from "../../form/Input";
import { useGS } from "../../../GlobalContext";
import { ethers } from "ethers";
import Btn from "../../Btn";
import BackBtn from "../../form/BackBtn";

interface IProps {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const BImportExisting = ({
    onSubmit
}: IProps) => {
    const [twelveWordPhrase, setTwelveWordPhrase] = useState<string>('')
    const [twelveWordPhraseErrorMsg, setTwelveWordPhraseErrorMsg] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const gs = useGS();

    const isDisabled = (str?: string) => {
        str = str || twelveWordPhrase;        
        const words = str.split(' ');
        
        return !(words.length === 12 && words[words.length - 1].length);
    }

    const onTwelveWordPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled(e.target.value)) {
            setTwelveWordPhraseErrorMsg("Must be exactly 12 words")
        } else setTwelveWordPhraseErrorMsg("")
        setTwelveWordPhrase(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isDisabled()) return;

        setIsLoading(true);

        try {            
            const wallet = ethers.Wallet.fromPhrase(twelveWordPhrase);

            // if wallet address in wallets, throw error
            if (!gs.state.wallets.every((w) => w.address !== wallet.address)) {
                gs.pushToast("Wallet already in EthBag");
                return;
            }

            gs.set({ newWallet: wallet, isNewWalletImportedFromPhrase: true });

            if (!onSubmit) {
                gs.set({
                    route: "create-password",                    
                })
            }

            onSubmit && onSubmit(e);
        } catch (err) {
            console.error(err);
            gs.pushToast("Error importing wallet");
        } finally { 
            setIsLoading(false);
        }
    }


    return (
        <FormContainer onSubmit={handleSubmit}>
            {!onSubmit? 
                <BackBtn />
            :null}
            <h1>Enter your Secret
                Recovery Phrase</h1>
            <h2>Once you recover your wallet you will
                create a new password to use it
                on EthBag. </h2>
            <Input
                label="12 word phrase"
                type="password"
                value={twelveWordPhrase}
                onChange={onTwelveWordPhraseChange}
                errorMsg={twelveWordPhraseErrorMsg}
            />            
            <Btn
                txt="Import Existing Wallet"
                className="mt-24"
                isLoading={isLoading}
                disabled={isDisabled()}
            />
        </FormContainer>
    )
}

export default BImportExisting;