import Link from "next/link"

type LogoProps = {
	sidebarStatus?: boolean
	setNav?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Logo({ sidebarStatus, setNav }: LogoProps) {
	const handleLogoClick = () => {
		if (setNav) {
			setNav(false)
		}
	}

	return (
		<Link
			href={"/"}
			onClick={handleLogoClick}
			className={`uppercase text-center text-sm font-bold text-primaryText border-y border-accentSecondary py-2 ${
				sidebarStatus && "text-xl w-full"
			}`}
		>
			Futr Gaming
		</Link>
	)
}
