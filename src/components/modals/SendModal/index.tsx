import s from "./styles.module.css";

import { useEffect, useState } from "react";
import FormContainer from "../../form/FormContainer";
import Input from "../../form/Input";
import Wallet from "./Wallet";
import { ethers } from "ethers";
import { useGS } from "../../../GlobalContext";
import { HDNodeWallet } from "ethers";
import Btn from "../../Btn";



const SendModal = () => {
    const gs = useGS();


    const [receipt, setReceipt] = useState<any>(null);
    const [successStage, setSuccessStage] = useState<boolean>(false);

    const [sendTo, setSendTo] = useState("");
    const [sendToErrorMsg, setSendToErrorMsg] = useState("");

    const [sendFrom, setSendFrom] = useState<HDNodeWallet>(gs.state.wallets.length === 1 ? gs.state.wallets[0] : { address: "" });

    const [amount, setAmount] = useState<string>("0");
    const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");

    const [estimatedGas, setEstimatedGas] = useState<string>("");
    const [gasLimit, setGasLimit] = useState<string>("21000");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isValidToAndFrom = () => {
        return (ethers.isAddress(sendTo) && sendFrom.address.length && sendTo !== sendFrom.address);

    }

    const onSendToWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendTo(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isDisabled()) return;
        
            setIsLoading(true);

            const tx = {
                to: sendTo,
                value: ethers.parseEther(amount),
                gasLimit: ethers.toBigInt(gasLimit),
            }

            try {
                const txResponse = await sendFrom.sendTransaction(tx);                

                const receipt = await txResponse.wait();                

                if (!receipt) {
                    gs.pushToast("Error getting receipt");
                    throw new Error("No receipt found");
                }

                setReceipt(receipt);

                setSuccessStage(true);                
            } catch (err: any) {
                if (err.message.includes("insufficient funds")) {
                    gs.pushToast("Insufficient funds");
                }
                gs.pushToast("Error sending transaction")
                console.error('Error sending transaction:', err);
            } finally {
                setIsLoading(false);                
            }        

    };

    const getEstimatedGas = async () => {
        try {
            if (!isValidToAndFrom()) return;
            const estimatedGas = await sendFrom.estimateGas({
                to: sendTo,
                value: ethers.parseEther(amount),
            });

            setAmountErrorMsg("");
            setEstimatedGas(ethers.formatEther(estimatedGas));
        } catch (err: any) {            
            if (err.message.includes("insufficient funds")) {
                setAmountErrorMsg("Insufficient funds");
            }
            console.error(err);
        }
    }

    const setSendFromWallet = (wallet: HDNodeWallet) => {
        setSendFrom(wallet);
    }

    useEffect(() => {
        if (!sendTo.length) {
            setSendToErrorMsg("");
            return;
        }
        if (!ethers.isAddress(sendTo)) {
            setSendToErrorMsg("Address is invalid");
        } else if (sendFrom.address === sendTo) {
            setSendToErrorMsg("Cannot send to same wallet");
        } else setSendToErrorMsg("");
    }, [sendTo, sendFrom])

    useEffect(() => {
        getEstimatedGas();
    }, [sendTo, sendFrom, amount])

    const isDisabled = () => {
        return Boolean(!isValidToAndFrom || gasLimit.length === 0 || amountErrorMsg.length)
    }

    return (
        <FormContainer onSubmit={handleSubmit} loading={isLoading} loadingMsg="Sending...">
            {!successStage ? (
                <>
                    <Input
                        containerStyle={{
                            marginTop: 0
                        }}
                        label="Send to"
                        value={sendTo}
                        onChange={onSendToWalletAddressChange}
                        type="text"
                        errorMsg={sendToErrorMsg}
                    />

                    {isValidToAndFrom() ? (
                        <>
                            <div className={s.amountInputWrapper} style={{ position: "relative", width: "100%" }}>
                                <Input

                                    label="Amount"
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    errorMsg={amountErrorMsg}
                                />
                                <span className={s.inputEthAdornment}>ETH</span>
                            </div>
                            <div className={s.estimatedGas}>
                                <span>Gas<span className={s.estimatedSpan}>{"(estimated)"}</span></span>
                                <span>{estimatedGas}</span>
                            </div>

                            <Input
                                label="Gas Limit"
                                type="text"
                                value={gasLimit}
                                onChange={(e) => setGasLimit(e.target.value)}
                            />
                        </>

                    )
                        : null}

                    <span className={s.sendFrom}>Send from</span>
                    <div className={s.walletsContainer}>
                        {gs.state.wallets.map((wallet) => (
                            <Wallet
                                key={wallet.address}
                                wallet={wallet}                                
                                isSelected={gs.state.wallets.length === 1 ? true : sendFrom.address === wallet.address}
                                setSelectedWallet={setSendFromWallet}
                            />
                        ))}
                    </div>
                    <Btn
                        txt="Send"
                        className="mt-24"
                        isLoading={isLoading}
                        disabled={isDisabled()}
                    />
                </>
            )
                : (
                    <div className={s.successStage}>
                        <svg id="Layer_1" enableBackground="new 0 0 512 512" height="246" viewBox="0 0 512 512" width="246" xmlns="http://www.w3.org/2000/svg"><g clipRule="evenodd" fillRule="evenodd"><path d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z" fill="var(--color-accent)" /><path d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z" fill="#fff" /></g></svg>
                        <h1>Transaction Successful</h1>
                        <h2>Transaction hash: {receipt?.hash}</h2>
                        <button
                            className="btn-primary mt-24"
                            onClick={() => gs.set({ modalRoute: "closed" })}
                        >
                            Close
                        </button>
                    </div>
                )
            }

        </FormContainer>
    )
}

export default SendModal;