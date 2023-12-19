// Could use web worker or rust to decrypt wallets
// for times sake, running on single threaded JS - so ensuring UI switches to loading.        
const waitForLoading = () => {
    return new Promise((resolve) => {                
        const interval = setInterval(() => {
            const btn = document.querySelector("button");
            if (btn && btn.classList.contains("loading")) {
                clearInterval(interval);
                resolve(void 0);
            }
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
            resolve(void 0);
        }, 3000);
    })
}

export default waitForLoading;