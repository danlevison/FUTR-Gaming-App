import Link from "next/link"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"

type CollectionCardProps = {
	title: string
	description: string
	visibility: boolean
	user: {
		uid: string
		displayName: string
		email: string
	}
}

export default function CollectionCard({
	title,
	description,
	visibility,
	user
}: CollectionCardProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>
						<Link
							href={"/"}
							className="underline"
						>
							{title}
						</Link>
					</CardTitle>
					<Button variant={"ghost"}>
						<FaRegTrashAlt size={20} />
					</Button>
				</div>

				<CardDescription>
					Collection <span className="text-gray-400">by:</span>{" "}
					{user.displayName}
				</CardDescription>
				<CardDescription>{description}</CardDescription>
				{visibility ? (
					<p className="flex items-center gap-2 font-bold text-gray-500">
						Private Collection <MdVisibilityOff />
					</p>
				) : (
					<p className="flex items-center gap-2 font-bold text-gray-500">
						Public Collection <MdVisibility />
					</p>
				)}
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
