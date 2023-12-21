import { motion } from "framer-motion"
import { MdClose } from "react-icons/md"
import NavLinks from "../NavLinks"
import SocialLinks from "../../SocialLinks"

type MobileNavMenuProps = {
	nav: boolean
	handleNav: () => void
}

export default function MobileNavMenu({ nav, handleNav }: MobileNavMenuProps) {
	const navAnimation = {
		open: {
			x: 0,
			opacity: 1,
			boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
			transition: {
				duration: 0.4,
				ease: "easeInOut"
			}
		},
		closed: {
			x: "100%", // Slide out to the right
			opacity: 0,
			boxShadow: "none",
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
				className={`fixed top-0 right-0 w-full max-w-[300px] h-screen overflow-y-auto bg-transparent backdrop-blur-lg px-8 pt-2 border-l border-gray-500
				}`}
			>
				<div className="flex items-center justify-between border-b pb-2 mb-4">
					<h2 className="text-2xl">Menu</h2>
					<button
						onClick={handleNav}
						aria-label="Close menu"
					>
						<MdClose size={30} />
					</button>
				</div>

				<div>
					<h3 className="border-b border-gray-300 text-lg pb-2 whitespace-nowrap">
						Main navigation
					</h3>
					<NavLinks
						nav={nav}
						handleNav={handleNav}
					/>
					<h3 className="border-b border-gray-300 text-lg pb-2 whitespace-nowrap my-6">
						Connect
					</h3>
					<SocialLinks nav={nav} />
				</div>
			</motion.div>
		</div>
	)
}
