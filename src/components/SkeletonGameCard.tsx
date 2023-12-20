import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function SkeletonGameCard() {
	return (
		<Card className="flex flex-col w-full min-h-[250px]">
			<Skeleton className="w-full min-h-[250px] rounded-t-lg" />
			<CardContent className="flex flex-col p-4 bg-background">
				<Skeleton className="w-44 h-6 rounded-md" />
				<Skeleton className="w-40 h-3 mt-4 mb-2 rounded-md" />
				<Skeleton className="w-32 h-3 rounded-md" />
			</CardContent>
			<CardFooter className="p-0 m-0 w-full">
				<Skeleton className="w-full h-[40px] rounded-b-lg" />
			</CardFooter>
		</Card>
	)
}
