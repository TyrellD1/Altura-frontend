import { useCreatePasswordContext } from '.';
import s from './styles.module.css';

interface IStrengthCheckerItemProps {
    txt: string;
    valid: boolean;
}

const StrengthCheckerItem = ({
    txt,
    valid
}: IStrengthCheckerItemProps) => {
    return (
        <div className={s.strengthCheckerItem}>
            <div className={s.strengthCheckerIconContainer}>
                {valid ?
                    (
                        <svg id="Layer_1" enableBackground="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g clipRule="evenodd" fillRule="evenodd"><path d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z" fill="var(--color-accent)" /><path d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z" fill="#fff" /></g></svg>
                    ) :
                    (
                        <svg id="Icons" height="17.5" viewBox="0 0 64 64" width="17.5" xmlns="http://www.w3.org/2000/svg" fill='#ffffff'><path d="m4.59 59.41a2 2 0 0 0 2.83 0l24.58-24.58 24.59 24.58a2 2 0 0 0 2.83-2.83l-24.59-24.58 24.58-24.59a2 2 0 0 0 -2.83-2.83l-24.58 24.59-24.59-24.58a2 2 0 0 0 -2.82 2.82l24.58 24.59-24.58 24.59a2 2 0 0 0 0 2.82z" /></svg>
                    )
                }
            </div>
            <div className={s.strengthCheckerItemTxt}
                style={{
                    color: valid ? 'var(--color-accent)' : 'var(--color-primary)'
                }}
            >{txt}</div>
        </div>
    )
}

const PasswordStrengthChecker = () => {
    const {
        passwordStrengthChecker
    } = useCreatePasswordContext();

    return (
        <div className={s.passwordStrengthChecker}>
            <StrengthCheckerItem
                txt="8 characters minimum"
                valid={passwordStrengthChecker.isEightChars}
            />
            <StrengthCheckerItem
                txt="Contains number"
                valid={passwordStrengthChecker.containsNumber}
            />
            <StrengthCheckerItem
                txt="Contains lowercase letter"
                valid={passwordStrengthChecker.containsLowercaseLetter}
            />
            <StrengthCheckerItem
                txt="Contains uppercase letter"
                valid={passwordStrengthChecker.containsUppercaseLetter}
            />
            <StrengthCheckerItem
                txt="Contains special character"
                valid={passwordStrengthChecker.containsSpecialChar}
            />
        </div>
    )
}

export default PasswordStrengthChecker;