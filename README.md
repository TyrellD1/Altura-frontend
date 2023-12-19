# Your Tauri App Name

## Description

EthBag uses Tauri to allow users to manage multiple eth wallets in a desktop application.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Recommended version: 18.18.2)
    - Recommend nvm to manage node versions: https://github.com/nvm-sh/nvm
- Rust (Recommended version: 1.74.0)

### Installation

Navigate to root directory on your machine.

Run:
```bash
npm install
```

### .env

We use a .env file locally for environment variables.

Include:
```bash
VITE_INFURA_URL=<your-infura-wss-url>
```

### Dev

To run dev locally:

```bash
npm run tauri dev
```

### Build

```bash
npm run tauri build
```

If you get error:

Error failed to bundle project: Failed to remove old EthBag.app

Delete src-tauri/target dir and run again

## React

We're using React as our frontend framework with Tauri. 

[React Docs](https://react.dev/)

## Security

Encrypted Wallets are stored in local storage.

Can only be decrypted with user password.

We force user to use same password for all wallets.

We never store password or mnemonic phrase.

## Global State

```js
src/GlobalContext.tsx
```

We're using useContext and useReducer to manage global state.

### Accessing in components

```js
import { useGS } from "{path}/GlobalContext";

const gs = useGs();
```

### Updating Global State

Updating global state is a simple process

```js
gs.set({
    <fieldToUpdate>: <value>
});
```

## File Tree

### Components

Components are generally organized in a directory with index.tsx being the main component file.

#### Styles

 Compnent specific styles go in a styles.module.css file in the component directory and are imported as
 ```js
 import s from "./styles.module.css";
 ```

#### Sub-components

If there are component specific sub-components that aren't used elsewhere, they go in create a components directory inside that directory.

#### Component file tree

-Components<br>
|-index.tsx<br>
|-styles.module.css<br>
|-components

## Routing

```js
src/components/SimpleRouter.tsx
```

We've implemented a simple routing system in our global state manager. gs.state.route determines the route. 

### Modal routing
```js
src/components/SimpleRouter.tsx
```

We use a modal router to open modal routes. Controlled by gs.state.modalRoute

## Global Infura Provider

Access our WSS Infura Provider using 
```js
gs.infuraProvider

// Example
const walletWithProvider = wallet.connect(gs.infuraProvider);
```

## Toast Notifcations

We use toast notfications through the app.

They clear automatically when gs.state.route changes.

Users can manually clear them in the UI by clicking X.

```js
gs.pushToast("<message");
```
