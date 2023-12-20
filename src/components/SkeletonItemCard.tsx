import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter } from "@/components/ui/card"

export default function SkeletonItemCard() {
	return (
		<Card className="flex min-h-[150px]">
			<Skeleton className="w-full min-h-[150px] rounded-lg" />
		</Card>
	)
}
