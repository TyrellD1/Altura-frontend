import GlobalContextProvider from "./GlobalContext";
import Modal from "./components/Modal";
import SimpleRouter from "./components/SimpleRouter";

const App = () => {
    return (
        <GlobalContextProvider> 
            <Modal />
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ height: 0, width: 0, position: "absolute", visibility: "hidden" }}>
                <defs>
                    <filter id="customColorMask" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="srcRGB" />
                        <feFlood floodColor="#5058f5" floodOpacity="1" result="flood" />
                        <feComposite in="flood" in2="SourceAlpha" operator="in" result="colored" />
                        <feBlend in="colored" in2="srcRGB" mode="multiply" />
                    </filter>
                </defs>
            </svg>           
            <SimpleRouter />
        </GlobalContextProvider>
    )
}

export default App;