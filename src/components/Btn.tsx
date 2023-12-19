

interface IProps {
    txt: string;
    loadingTxt?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    isContained?: boolean;
    className?: string;
}

const Btn = ({
    txt,
    loadingTxt = "Loading...",
    type = "submit",
    onClick = () => { },
    disabled,
    isLoading,
    isContained = false,
    className
}: IProps) => {
    const formClassName = () => {
        const classNames = ["btn-primary"];
        if (isContained) classNames.push("contained");
        if (className) classNames.push(className);
        if (isLoading) classNames.push("loading");
        return classNames.join(" ");
    }

    return (
        <button className={formClassName()}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? loadingTxt : txt}
        </button>
    )
}

export default Btn;