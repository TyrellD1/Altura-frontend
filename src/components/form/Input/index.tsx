import s from "./styles.module.css";

interface IProps {
    errorMsg?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    type: string;
    containerStyle?: React.CSSProperties;
}

const handleShowClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;

    if (input.type === "password") {
        input.type = "text";
        e.currentTarget.innerText = "Hide";
    } else {
        input.type = "password";
        e.currentTarget.innerText = "Show";
    }
}

const Input = ({
    errorMsg,
    value,
    onChange,
    label,
    type,
    containerStyle
}: IProps) => {    

    return (
        <div className={s.inputContainer} style={containerStyle}>            
            <div style={{
                width: "100%",
                marginBottom: "7px",
                position: "relative"
            }}>
                {type === "password" && <span className={s.showHideTxt} onClick={(e) => handleShowClick(e, label)}>Show</span>}
                <label className={s.inputLabel} htmlFor={label}>{label}</label>
            </div>
            <input
                type={type}
                // if ever use same label on same page, refactor this to accept id as prop
                id={label}
                value={value}
                onChange={onChange}
                className={s.input}
            />
            {errorMsg && <p className={s.errorMsg}>{errorMsg}</p>}
        </div>
    )
}

export default Input;