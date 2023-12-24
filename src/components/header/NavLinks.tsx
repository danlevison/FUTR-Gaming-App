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
		<ul className="flex flex-col justify-between gap-5 md:gap-7 mt-8">
			{pageRoutes.map(({ name, path, icon }) => (
				<li
					key={path}
					className="group w-fit"
				>
					<Link
						href={path}
						className="flex items-center gap-2"
						onClick={handleNav}
					>
						<span
							className={`${
								pathname === path
									? "text-white"
									: "text-gray-400 group-hover:text-primaryText duration-300"
							}`}
						>
							{icon}
						</span>

						{(sidebarStatus || nav) && (
							<span
								className={`font-bold text-gray-400 text-lg transition-all group-hover:text-primaryText duration-300 ${
									pathname === path && "text-white"
								} ${sidebarStatus || nav ? "block" : "hidden"} `}
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
