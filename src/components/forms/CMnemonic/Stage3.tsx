import s from "./styles.module.css";

const Stage3 = () => {
    return (
        <div className={s.stage3Container}>
            <p>Remember:</p>            
            <ul>
                <li>EthBag cannot recover your secret recovery phrase.</li>
                <li>Your password is valid only on EthBag.</li>
                <li>We will never ask you for your secret recover phrase.</li>
                <li>Anyone who has your secret recovery phrase can access your wallet. Never share it with anyone.</li>
            </ul>

        </div>
    )
}

export default Stage3;