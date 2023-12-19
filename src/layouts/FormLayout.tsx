

interface TProps {
    children: React.ReactNode | React.ReactNode[];    
}

const FormLayout = ({
    children
}: TProps) => {
    return (
        <main className="form-layout">
            <span className="altura-frontend-logo">EthBag</span>
            {children}
        </main>
    )
}

export default FormLayout;