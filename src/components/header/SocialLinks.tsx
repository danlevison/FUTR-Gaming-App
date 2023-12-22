import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BsDiscord, BsSteam, BsTwitch, BsYoutube } from "react-icons/bs"

export default function SocialLinks({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const socialIcons = [
		{
			name: "Discord",
			icon: <BsDiscord size={25} />
		},
		{
			name: "Steam",
			icon: <BsSteam size={25} />
		},
		{
			name: "Twitch",
			icon: <BsTwitch size={25} />
		},
		{
			name: "YouTube",
			icon: <BsYoutube size={25} />
		}
	]
	return (
		<ul className="flex flex-col gap-5 md:gap-7 mt-auto text-primaryText">
			{socialIcons.map(({ name, icon }) => (
				<li
					key={name}
					className="group w-fit"
				>
					<Link
						href="/"
						className="flex items-center gap-2"
					>
						<span className="text-gray-400 group-hover:text-primaryText duration-300">
							{icon}
						</span>

						{(sidebarStatus || nav) && (
							<span
								className={`font-bold text-lg text-gray-400 transition-all group-hover:text-primaryText duration-300 ${
									sidebarStatus || nav ? "block" : "hidden"
								}`}
							>
								{name}
							</span>
						)}
					</Link>
				</li>
			))}
		</ul>
	)
}
