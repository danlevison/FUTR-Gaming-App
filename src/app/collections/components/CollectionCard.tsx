import Link from "next/link"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"

type CollectionCardProps = {
	user: {
		uid: string
		displayName: string
		email: string
	}
}

export default function CollectionCard({ user }: CollectionCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Link
						href={"/"}
						className="underline"
					>
						Test
					</Link>
				</CardTitle>
				<CardDescription>
					<p>
						Collection <span className="text-gray-400">by:</span>{" "}
						{user.displayName}
					</p>
					<span className="font-bold text-gray-500">Private collection</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-5 w-full py-4">
					<div>
						<p>1</p>
						<p className="font-bold text-gray-500">game</p>
					</div>
					<div className="border-r-2 h-full border-black" />
					<div>
						<p>0</p>
						<p className="font-bold text-gray-500">followers</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>*Game Image*</CardFooter>
		</Card>
	)
}

;<div className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-5"></div>
