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
import { useToast } from "@/components/ui/use-toast"
import { useDeleteCollectionMutation } from "@/redux/features/collectionsApiSlice"

type CollectionCardProps = {
	id: string
	title: string
	description: string
	isPublic: boolean
	games: any[]
	user: {
		uid: string
		displayName: string
		email: string
	}
}

export default function CollectionCard({
	id,
	title,
	description,
	isPublic,
	games,
	user
}: CollectionCardProps) {
	const [deleteCollection] = useDeleteCollectionMutation()
	const { toast } = useToast()

	const handleDeleteCollection = async (collectionId: string) => {
		try {
			await deleteCollection({ userId: user.uid, collectionId: collectionId })
			toast({
				variant: "default",
				description: "Your collection has been successfully deleted."
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>
						<Link
							href={`/collections/${id}`}
							className="underline"
						>
							{title}
						</Link>
					</CardTitle>
					<Button
						variant={"ghost"}
						onClick={() => handleDeleteCollection(id)}
					>
						<FaRegTrashAlt size={20} />
					</Button>
				</div>

				<CardDescription>
					Collection <span className="text-gray-400">by:</span>{" "}
					{user.displayName}
				</CardDescription>
				<CardDescription>{description}</CardDescription>
				{isPublic ? (
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
						<p>{games.length}</p>
						<p className="font-bold text-gray-500">
							{games.length === 1 ? "game" : "games"}
						</p>
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
