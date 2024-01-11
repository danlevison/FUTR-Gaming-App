import Link from "next/link"
import { userRoutes } from "@/routes/routes"
import type { UserT } from "@/types"

export default function UserLinks({
	user,
	sidebarStatus,
	nav,
	handleNav
}: {
	user: UserT
	sidebarStatus?: boolean
	nav?: boolean
	handleNav?: () => void
}) {
	return (
		<ul className="flex flex-col gap-5 md:gap-7 mt-5 md:mt-8">
			{userRoutes.map(({ name, path, icon }) => (
				<li
					key={name}
					className="group w-fit"
				>
					<Link
						href={path === "/wishlist" ? `/wishlist/${user?.uid}` : path}
						className="flex items-center gap-2"
						onClick={handleNav}
					>
						<span className="text-gray-400 group-hover:text-primaryText duration-300">
							{icon}
						</span>

						{(sidebarStatus || nav) && (
							<span
								className={`font-bold md:text-lg text-gray-400 transition-all group-hover:text-primaryText duration-300 ${
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
