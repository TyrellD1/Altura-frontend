

interface IProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    loading?: boolean;
    loadingMsg?: string;
}

const FormContainer = ({
    children,
    className,
    loading = false,
    loadingMsg = "Loading...",
    onSubmit = (e) => { e.preventDefault() }
}: IProps) => {
    return (
        <form onSubmit={onSubmit} className={`form-container ${className}`}>
            {loading ?
                <div className="form-loading-container">
                    <div className="eth-gif-container">
                        <img
                            className="eth-gif"
                            src="/imgs/eth.gif" alt="ethereum gif" />
                    </div>
                    <h2 className="mt-24">{loadingMsg}</h2>
                </div>
                : null}
            {children}
        </form>
    )
}

export default FormContainer;