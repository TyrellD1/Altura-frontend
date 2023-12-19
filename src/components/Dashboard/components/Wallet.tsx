import s from "../styles.module.css";
import { useState } from "react";
import CopyToClipboardSvg from "./CopyToClipboardSvg";
import { useGS } from "../../../GlobalContext";

interface IProps {
    walletAddress: string;
}

const Wallet = ({
    walletAddress,
}: IProps) => {
    const [copied, setCopied] = useState<boolean>(false);

    const gs = useGS();

    const ethBalance = gs.state[walletAddress] || "";

    const returnEthBalance = () => {
        if (ethBalance.length === 0) {
            return "Loading...";
        } else {
            if (ethBalance.length > 10) {
                return `ETH ${ethBalance.slice(0, 10)}...`;
            }
            return `ETH ${ethBalance}`;
        }
    }

    const onClick = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <div className={s.walletContainer}
            onClick={onClick}
        >
            <div
                title={walletAddress}
                className={`${s.walletAddressContainer} ${copied ? s.copied : ""}`}>
                <span>Wallet Address</span>
                <p>{walletAddress.slice(0, 6)}...{walletAddress.slice(walletAddress.length - 4, walletAddress.length)}
                    <CopyToClipboardSvg copied={copied} />
                </p>
            </div>

            <p
                title={ethBalance.length > 10 ? ethBalance : ""}
                className={s.ethBalance}
            >
                {returnEthBalance()}
            </p>

        </div>
    )
}

export default Wallet;