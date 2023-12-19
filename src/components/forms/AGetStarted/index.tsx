import s from "./styles.module.css";

import FormContainer from "../../form/FormContainer";
import { useGS } from "../../../GlobalContext";

const AGetStarted = () => {
    const gs = useGS();

    return (
        <FormContainer>
            <div className="eth-gif-container">
                <img
                    className="eth-gif"
                    src="/imgs/eth.gif" alt="ethereum gif" />
            </div>
            <h1 className={s.h1}>Let's get started</h1>
            <h2>Manage your wallet on EthBag.</h2>
            <button onClick={() => gs.set({ route: "create-password" })} className={`btn-primary contained ${s.btnA}`}>
                Create a new wallet
            </button>
            <button onClick={() => gs.set({ route: "import-existing" })} className={`btn-primary ${s.btnB}`}>
                Import existing wallet
            </button>
        </FormContainer>
    )
}

export default AGetStarted;