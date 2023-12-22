import { Skeleton } from "@/components/ui/skeleton"
import SkeletonGameScreenshots from "./SkeletonGameScreenshots"
import SkeletonBanner from "./SkeletonBanner"

export default function SkeletonItemCard() {
	return (
		<>
			<SkeletonBanner />

			<SkeletonGameScreenshots />

			<Skeleton className="w-full h-14 mt-10" />

			<div className="flex flex-col gap-5 lg:gap-10 lg:flex-row w-full h-auto bg-foreground mt-10 p-5 rounded-lg">
				<div className="w-full max-w-[700px]">
					<Skeleton className=" h-24 rounded-md" />
					<Skeleton className="h-20 rounded-md mt-4" />
				</div>
				<Skeleton className="w-full max-w-[500px] h-20 rounded-md" />
				<Skeleton className="w-full max-w-[500px] h-20 rounded-md" />
			</div>
		</>
	)
}
