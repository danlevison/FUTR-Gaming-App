import { useState } from "react"

export default function Description({ description }: { description: string }) {
	const [showMore, setShowMore] = useState(false)

	const displayDescription = showMore
		? description
		: `${description?.slice(0, 200)}...`
	return (
		<div className="w-full max-w-[700px]">
			<p
				dangerouslySetInnerHTML={{ __html: displayDescription || "" }}
				className="space-y-4"
			/>
			<button
				onClick={() => setShowMore(!showMore)}
				className="mt-2 bg-white text-black text-sm rounded-sm p-[0.15rem] hover:opacity-60 duration-300"
			>
				{showMore ? "Show Less" : "Read More"}
			</button>
		</div>
	)
}
