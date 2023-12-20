import { cn } from "@/lib/utils"

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse bg-gray-500", className)}
			{...props}
		/>
	)
}

export { Skeleton }
