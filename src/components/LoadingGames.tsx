import SkeletonGameCard from "./SkeletonGameCard"

export default function LoadingGames() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5 w-full">
			{"abcdefghijkl".split("").map((i) => (
				<SkeletonGameCard key={i} />
			))}
		</div>
	)
}
