import { motion } from "framer-motion"
import { MdClose } from "react-icons/md"
import NavLinks from "../NavLinks"
import UserLinks from "../UserLinks"
import LoginBtn from "../LoginBtn"
import LogoutBtn from "../LogoutBtn"
import UserInfo from "../UserInfo"
import PortfolioLink from "../PortfolioLink"
import useUser from "@/hooks/useUser"

type MobileNavMenuProps = {
	nav: boolean
	handleNav: () => void
}

export default function MobileNavMenu({ nav, handleNav }: MobileNavMenuProps) {
	const user = useUser()
	const navAnimation = {
		open: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: "easeInOut"
			}
		},
		closed: {
			x: "100%",
			opacity: 0,
			transition: {
				duration: 0.4,
				ease: "easeInOut"
			}
		}
	}

	return (
		<div className={nav ? "block" : "hidden"}>
			<motion.div
				variants={navAnimation}
				initial={"closed"}
				animate={nav ? "open" : "closed"}
				className={`fixed top-0 right-0 w-full max-w-[300px] h-screen overflow-y-auto bg-[#131826]/60 backdrop-blur-lg px-8 pt-2 border-l border-gray-500
				}`}
			>
				<div className="flex items-center justify-between border-b pb-2 mb-4">
					<h2 className="text-2xl">Menu</h2>
					<button
						onClick={handleNav}
						aria-label="Close menu"
					>
						<MdClose
							size={30}
							aria-hidden={true}
						/>
					</button>
				</div>

				{user && (
					<div>
						<UserInfo
							nav={nav}
							handleNav={handleNav}
						/>
					</div>
				)}

				<div>
					<UserLinks
						nav={nav}
						handleNav={handleNav}
					/>
					<h3 className="border-b border-gray-300 text-lg pb-2 whitespace-nowrap mt-5">
						Main navigation
					</h3>
					<NavLinks
						nav={nav}
						handleNav={handleNav}
					/>
				</div>
				<div className="mt-5 mb-2">
					{user ? <LogoutBtn nav={nav} /> : <LoginBtn nav={nav} />}
				</div>
				<PortfolioLink nav={nav} />
			</motion.div>
		</div>
	)
}
