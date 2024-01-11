import SkeletonItemCard from "../skeletons/SkeletonItemCard"

export default function LoadingItems() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-5 w-full">
			{Array.from({ length: 20 }).map((_, i) => (
				<SkeletonItemCard key={i} />
			))}
		</div>
	)
}
