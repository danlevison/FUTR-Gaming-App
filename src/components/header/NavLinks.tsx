"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { pageRoutes } from "@/routes/routes"

export default function NavLinks({
	sidebarStatus,
	nav,
	handleNav
}: {
	sidebarStatus?: boolean
	nav?: boolean
	handleNav?: () => void
}) {
	const pathname = usePathname()
	return (
		<ul className="flex flex-col justify-between gap-5 md:gap-10 mt-8">
			{pageRoutes.map((route) => (
				<li
					key={route.path}
					className="group"
				>
					<Link
						href={route.path}
						className="flex items-center gap-2"
						onClick={handleNav}
					>
						<span
							className={`${
								pathname === route.path
									? "text-white"
									: "text-gray-400 group-hover:text-primaryText duration-300"
							}`}
						>
							{route.icon}
						</span>

						<AnimatePresence>
							{(sidebarStatus || nav) && (
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className={`font-bold text-lg transition-all group-hover:text-primaryText duration-300 ${
										sidebarStatus || nav ? "block" : "hidden"
									} ${
										pathname === route.path ? "text-white" : "text-gray-400"
									}`}
								>
									{route.name}
								</motion.span>
							)}
						</AnimatePresence>
					</Link>
				</li>
			))}
		</ul>
	)
}
