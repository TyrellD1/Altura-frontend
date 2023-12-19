import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';
import ToastStack from './components/ToastStack';
import { HDNodeWallet, ethers } from 'ethers';
import { WebSocketProvider } from 'ethers';
import { getProvider } from './utils/getProvider';

export interface HDNodeWalletWithBalance extends HDNodeWallet {
    balance: string
}

type TRoute = "get-started"
    | "login"
    | "import-existing"
    | "save-mnemonic"
    | "create-password"
    | "dashboard"

type TModalRoute = "closed" |
    "send" |
    "add-wallet"

interface IEthBagReducer {
    route: TRoute
    modalRoute: TModalRoute
    canCloseModal: boolean
    newWallet?: HDNodeWallet
    isNewWalletImportedFromPhrase?: boolean
    encryptPassword?: string
    wallets: any[]        
    toastStack: string[]
    isLoading: boolean
    // using to store balances - to not obstruct ethers.js HDNodeWallet type
    [key: string]: any
}

const ethBagWallets = localStorage.getItem("eth-bag-wallets");

const initialState: IEthBagReducer = {
    route: ethBagWallets ? "login" : "get-started",
    modalRoute: "closed",
    canCloseModal: true,
    newWallet: undefined,
    wallets: [],
    balances: {},
    toastStack: [],
    isLoading: false,
};

interface IGlobalStateContext {
    state: IEthBagReducer;
    set: Dispatch<Partial<IEthBagReducer>>;
    pushToast: (error: string) => void;
    infuraProvider?: WebSocketProvider;
}

const GlobalStateContext = createContext<{
    state: IEthBagReducer;
    set: Dispatch<Partial<IEthBagReducer>>;
    pushToast: (error: string) => void;
    infuraProvider?: WebSocketProvider;
} | undefined>(undefined);


const reducer = (state: IEthBagReducer, updates: Partial<IEthBagReducer>) => ({
    ...state,
    ...updates,
});

interface GlobalStateProviderProps {
    children: ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalStateProviderProps) => {
    const provider = getProvider(import.meta.env.VITE_INFURA_URL);
    const [state, dispatch] = useReducer(reducer, initialState);

    const set = (action: Partial<IEthBagReducer>) => dispatch(action);

    const removeErrorByIdx = (idx: number) => {
        const toastStack = [...state.toastStack];
        toastStack.splice(idx, 1);
        set({ toastStack });
    }

    const pushToast = (error: string) => {
        const toastStack = [...state.toastStack];
        toastStack.push(error);
        set({ toastStack });
    }

    useEffect(() => {
        const newToastStack = !provider ? ["Error connecting"] : [];
        set({ toastStack: newToastStack })
    }, [state.route])

    provider?.on("block", async () => {
        if (!state.wallets.length) return;

        for (const wallet of state.wallets) {
            const balance = await wallet.provider.getBalance(wallet.address);
            const formattedBalance = ethers.formatEther(balance);
            set({
                [wallet.address]: formattedBalance,
            })
        }        
    })

    return (
        <GlobalStateContext.Provider value={{
            state, set,
            pushToast,
            infuraProvider: provider,
        }}>
            <ToastStack toastStack={state.toastStack} removeErrorByIdx={removeErrorByIdx} />
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalContextProvider;

export const useGS = (): IGlobalStateContext => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
