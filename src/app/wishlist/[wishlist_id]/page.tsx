import PageHeading from "@/components/PageHeading"
import WishListGames from "./components/WishlistGames"

export default function Wishlist() {
	return (
		<main className="min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<PageHeading headingText="Wishlist" />
			<div className="mt-10">
				<WishListGames />
			</div>
		</main>
	)
}
