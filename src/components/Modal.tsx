import { useGS } from "../GlobalContext";
import AddWalletModal from "./modals/AddWalletModal";
import SendModal from "./modals/SendModal";


const ModalRouter = () => {
    const { state } = useGS();

    switch (state.modalRoute) {
        case "closed":
            return null;
        case "send":
            return <SendModal />;
        case "add-wallet":
            return <AddWalletModal />;
    }
}

const Modal = () => {

    const {
        state: {
            modalRoute,            
            canCloseModal,
        }, 
        set
    } = useGS()

    const handleClose = () => {
        if (canCloseModal) {
            set({
                modalRoute: "closed",
            })
        }
    }

    if (modalRoute === "closed") return null;

    return (
        <>
            <div style={{
                zIndex: 2,
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 'fit-content',
                height: 'fit-content',
            }}>
                <ModalRouter />
            </div>
            <div
                onClick={handleClose}
                style={{
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(16, 18, 35, 0.70)"
                }}></div>
        </>
    )
}

export default Modal;