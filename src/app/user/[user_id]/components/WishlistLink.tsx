import Link from "next/link"

export default function WishlistLink({
	userParamId
}: {
	userParamId: string | string[]
}) {
	return (
		<Link
			href={`/wishlist/${userParamId}`}
			className="block w-full xs:max-w-[140px] text-center text-sm border-input border h-10 px-4 py-[0.65rem] rounded-md bg-background hover:bg-accent hover:text-accent-foreground duration-300 mt-2"
		>
			View wishlist ❤️
		</Link>
	)
}
