import s from "./styles.module.css";

import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import Stage3 from "./Stage3";
import { useGS } from "../../../GlobalContext";


const CMnemonic = () => {
    type TStage = 1 | 2 | 3;
    const [stage, setStage] = useState<TStage>(1);

    const [hidden, setHidden] = useState<boolean>(true);

    const [mnemonicCopiedToClipboard, setMnemonicCopiedToClipboard] = useState<boolean>(false);

    const gs = useGS();

    const btnTxt = () => {
        switch (stage) {
            case 1:
                return "Reveal Secret Recovery Phrase";
            case 2:
                return "Finish";
            case 3:
                return "Ok!";
        }
    }

    const handleBtnClick = () => {
        switch (stage) {
            case 1:
                setStage(2);
                setHidden(false);
                break;
            case 2:
                setStage(3);
                break;
            case 3:                                
                gs.set({
                    route: "dashboard",
                    newWallet: undefined,
                    modalRoute: "closed",
                })
                break;
        }
    }

    const copyMnemonicToClipboard = () => {        
        navigator.clipboard.writeText(gs.state.newWallet?.mnemonic?.phrase || "");
        setMnemonicCopiedToClipboard(true);

        setTimeout(() => {
            setMnemonicCopiedToClipboard(false);
        }, 3000);
    }

    const h1Txt = () => {
        if (stage === 1 || stage === 2) {
            return "Write down your recovery phrase";
        } else return "Congratulations";
    }

    const h2Txt = () => {
        if (stage === 1 || stage === 2) {
            return "This 12-word Secret Recovery Phrase grants access to your wallet. Write in a place only you can access.";
        } else return "Wallet Creation Successful";
    }

    return (

        <FormContainer className={s.mnemonicFormContainer}>
            <h1>{h1Txt()}</h1>
            <h2>{h2Txt()}</h2>
            {stage === 1 || stage === 2 ? <div className={`${s.mnemonicContainer} ${hidden ? "" : s.show}`}>
                {hidden ?
                    <img
                        src="/imgs/mnemonic-hidden.png"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer"
                        }}
                        alt="hidden mnemonic"
                    /> :
                    <p className={s.mnemonicTxt}>{gs.state.newWallet?.mnemonic?.phrase}</p>
                }
            </div>
                : null}

            {stage === 2 ?
                <div className={s.mnemonicOptionsContainer}>
                    <p onClick={() => setHidden(val => !val)} style={{
                        cursor: "pointer"
                    }}>
                        {hidden ? "Show secret phrase" : "Hide secret phrase"}
                    </p>

                    <p
                        style={{
                            display: hidden ? "none" : undefined,
                        }}
                        className={mnemonicCopiedToClipboard ? "" : s.mnemonicCopyToClipboard}
                        onClick={copyMnemonicToClipboard}
                    >
                        {/* Can put svgs in components for cleanliness */}
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 488.3 488.3" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
			C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
			c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/>
                                    <path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
			c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
			V38.6C439.65,17.3,422.35,0,401.05,0z"/>
                                </g>
                            </g>
                        </svg>
                        {mnemonicCopiedToClipboard ? "Copied to clipboard!" : "Copy to clipboard"}
                    </p>
                </div>
                : null}

            {stage === 3 ? <Stage3 /> : null}

            <button
                type="button"
                className="btn-primary mt-auto"
                onClick={handleBtnClick}
            >
                {btnTxt()}
            </button>
        </FormContainer>
    )
}

export default CMnemonic;