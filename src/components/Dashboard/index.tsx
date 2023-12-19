import { HDNodeWallet } from 'ethers';
import { useGS } from '../../GlobalContext';
import Navbar from './components/Navbar';
import Wallet from './components/Wallet';
import s from './styles.module.css';

const Dashboard = () => {
    const gs = useGS();    

    return (
        <main className={s.dashboardMain}>
            <Navbar />
            <div className={s.walletsContainer}>
                {gs.state.wallets.map((wallet: HDNodeWallet) => {
                    return (
                        <Wallet
                            key={wallet.address}
                            walletAddress={wallet.address}
                        />
                    )
                })}
                <button
                    disabled={gs.state.wallets.length >= 5}
                    onClick={() => gs.set({ modalRoute: "add-wallet" })}
                    className={`${s.dashboardAddWalletBtn} btn-primary`}
                >
                    {gs.state.wallets.length >= 5 ? "Max 5 wallets" : "Add wallet"}
                </button>
            </div>
        </main>
    )
}

export default Dashboard;