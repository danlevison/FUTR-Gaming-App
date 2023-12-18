import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { pageRoutes } from "@/routes/routes"

export default function NavLinks({
	sidebarStatus
}: {
	sidebarStatus: boolean
}) {
	const pathname = usePathname()
	return (
		<ul className="flex justify-between items-center gap-5 md:gap-10 md:flex-col md:items-start md:mt-8">
			{pageRoutes.map((route) => (
				<li
					key={route.path}
					className="group"
				>
					<Link
						href={route.path}
						className="md:flex md:items-center md:gap-2"
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
							{sidebarStatus && (
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className={`hidden font-bold text-lg transition-all group-hover:text-primaryText duration-300 ${
										sidebarStatus ? "md:block" : "md:hidden"
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
