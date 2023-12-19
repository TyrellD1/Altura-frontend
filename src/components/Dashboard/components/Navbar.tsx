import { useGS } from "../../../GlobalContext";
import s from "../styles.module.css";

const Navbar = () => {
    const gs = useGS();

    return (
        <div className={s.dashboardNavbar}>
            <span className={"altura-frontend-logo"}>EthBag</span>
            
            <button className={`${s.dashboardNavbarSendBtn} btn-primary`}
                onClick={() => gs.set({
                    modalRoute: "send"
                })}
            >
                Send
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512.001 512.001" xmlSpace="preserve">
                    <g>
                        <g>
                            <path d="M507.608,4.395c-4.243-4.244-10.609-5.549-16.177-3.321L9.43,193.872c-5.515,2.206-9.208,7.458-9.42,13.395
			c-0.211,5.936,3.101,11.437,8.445,14.029l190.068,92.181l92.182,190.068c2.514,5.184,7.764,8.455,13.493,8.455
			c0.178,0,0.357-0.003,0.536-0.01c5.935-0.211,11.189-3.904,13.394-9.419l192.8-481.998
			C513.156,15.001,511.851,8.638,507.608,4.395z M52.094,209.118L434.72,56.069L206.691,284.096L52.094,209.118z M302.883,459.907
			l-74.979-154.599l228.03-228.027L302.883,459.907z"/>
                        </g>
                    </g>

                </svg>
            </button>
        </div>
    )
}

export default Navbar;