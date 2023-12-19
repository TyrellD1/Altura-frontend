import s from "./styles.module.css";

import { HDNodeWallet } from "ethers";
import { useGS } from "../../../GlobalContext";

interface IProps {
    wallet: HDNodeWallet;

    isSelected: boolean;
    setSelectedWallet: (wallet: HDNodeWallet) => void;
}

const Wallet = ({
    wallet,    

    isSelected,
    setSelectedWallet
}: IProps) => {
    const gs = useGS();

    const ethBalance = gs.state[wallet.address] || "";

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

    return (
        <div
            title={wallet.address}
            className={`${s.walletContainer} ${isSelected ? s.walletContainerSelected : ""}`} onClick={() => setSelectedWallet(wallet)}>
            <span className={s.walletAddress}
            >{wallet.address.slice(0, 6)}...{wallet.address.slice(wallet.address.length - 4, wallet.address.length)}</span>
            <span className={s.ethBalance}>{returnEthBalance()}</span>
        </div>
    )
}

export default Wallet;