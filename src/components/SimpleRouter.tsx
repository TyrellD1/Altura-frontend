// Simple router implementation
// If had more routes/larger application - would make more extensive or use a library

import { useGS } from "../GlobalContext";
import FormLayout from "../layouts/FormLayout";
import Dashboard from "./Dashboard";

import AGetStarted from "./forms/AGetStarted";
import BCreatePassword from "./forms/BCreatePassword";
import BImportExisting from "./forms/BImportExisting";
import CLogin from "./forms/CLogin";
import CMnemonic from "./forms/CMnemonic";



const SimpleRouter = () => {
    const { state: { route } } = useGS();

    switch (route) {
        case "get-started":
            return (
                <FormLayout>
                    <AGetStarted />
                </FormLayout>
            );
        case "import-existing":
            return (
                <FormLayout>
                    <BImportExisting />
                </FormLayout>
            );
        case "create-password":
            return (
                <FormLayout>
                    <BCreatePassword />
                </FormLayout>
            );
        case "save-mnemonic":
            return (
                <FormLayout>
                    <CMnemonic />
                </FormLayout>
            );
        case "login":
            return (
                <FormLayout>
                    <CLogin />
                </FormLayout>
            );
        case "dashboard":
            return <Dashboard />;
    }
}

export default SimpleRouter;