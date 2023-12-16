import Link from "next/link"
import { BsRssFill, BsSteam, BsTwitch, BsYoutube } from "react-icons/bs"

export default function SocialLinks() {
	return (
		<>
			<li>
				<Link href="/">
					<BsRssFill />
				</Link>
			</li>
			<li>
				<Link href="/">
					<BsSteam size={18} />
				</Link>
			</li>
			<li>
				<Link href="/">
					<BsTwitch size={18} />
				</Link>
			</li>
			<li>
				<Link href="/">
					<BsYoutube size={19} />
				</Link>
			</li>
		</>
	)
}
