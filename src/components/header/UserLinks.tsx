import Link from "next/link"
import { BsCollectionFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa"

export default function UserLinks({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const icons = [
		{
			name: "Collections",
			icon: <BsCollectionFill size={25} />
		},
		{
			name: "Wishlist",
			icon: <FaHeart size={25} />
		}
	]
	return (
		<ul className="flex flex-col gap-5 md:gap-7 md:mt-16 text-primaryText">
			{icons.map(({ name, icon }) => (
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
