

interface IProps {
    toastStack: string[];
    removeErrorByIdx: (idx: number) => void;
}

const ToastStack = ({
    toastStack,
    removeErrorByIdx
}: IProps) => {
    if (!toastStack.length) return null;

    return (
        <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "500px",
            maxWidth: "90%",
            height: "fit-content",
            backgroundColor: "var(--color-bg)",
            zIndex: 1000,
        }}>
            {toastStack.map((error, index) => {
                return (
                    <div key={index} style={{
                        padding: "10px",
                        border: "1px solid var(--color-accent)",
                        color: "var(--color-accent)",
                        borderRadius: "5px",
                        marginBottom: "10px",
                        width: "100%",
                        position: "relative",
                        paddingLeft: "33px",
                    }}>
                        <svg style={{
                            position: "absolute",
                            left: "10px",
                            top: "13px",
                            cursor: "pointer"
                        }}
                            onClick={() => removeErrorByIdx(index)}
                            id="Icons" height="17.5" viewBox="0 0 64 64" width="17.5" xmlns="http://www.w3.org/2000/svg" fill='var(--color-accent)'><path d="m4.59 59.41a2 2 0 0 0 2.83 0l24.58-24.58 24.59 24.58a2 2 0 0 0 2.83-2.83l-24.59-24.58 24.58-24.59a2 2 0 0 0 -2.83-2.83l-24.58 24.59-24.59-24.58a2 2 0 0 0 -2.82 2.82l24.58 24.59-24.58 24.59a2 2 0 0 0 0 2.82z" /></svg>
                        {error}
                    </div>
                )
            })}
        </div>
    )
}

export default ToastStack;