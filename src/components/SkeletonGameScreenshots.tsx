import { Skeleton } from "./ui/skeleton"

export default function SkeletonGameScreenshots() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
			<Skeleton className="w-full h-[300px] rounded-md" />
			<Skeleton className="hidden md:block w-full h-[300px] rounded-md" />
			<Skeleton className="hidden lg:block w-full h-[300px] rounded-md" />
		</div>
	)
}
