import { useGS } from "../../GlobalContext";


const BackBtn = () => {
    const gs = useGS();

    return (
        <span
            className="back-btn"
            style={{
                position: "absolute",
                top: "15px",
                left: "20px",
                fontSize: "20px",
                cursor: "pointer",
            }}
            onClick={() => gs.set({ route: "get-started" })}
        >
            {"<-"}Back
        </span>
    )
}

export default BackBtn;