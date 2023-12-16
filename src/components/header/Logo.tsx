import Link from "next/link"

export default function Logo() {
	return (
		<Link
			href={"/"}
			className="uppercase text-4xl lg:text-5xl font-bold text-primaryText"
		>
			Games
		</Link>
	)
}
