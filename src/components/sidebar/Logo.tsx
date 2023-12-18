import Link from "next/link"

export default function Logo({ sidebarStatus }: { sidebarStatus: boolean }) {
	return (
		<Link
			href={"/"}
			className={`uppercase text-center text-sm font-bold text-primaryText border-y border-yellow-500 py-2 ${
				sidebarStatus && "text-xl w-full"
			}`}
		>
			Futr Gaming
		</Link>
	)
}
