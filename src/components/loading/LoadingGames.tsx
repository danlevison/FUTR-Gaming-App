import SkeletonGameCard from "../skeletons/SkeletonGameCard"

export default function LoadingGames() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5 w-full">
			{Array.from({ length: 12 }).map((_, i) => (
				<SkeletonGameCard key={i} />
			))}
		</div>
	)
}
