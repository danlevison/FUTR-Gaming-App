import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useDeleteCollectionMutation } from "@/redux/features/collectionsApiSlice"
import { FaRegTrashAlt } from "react-icons/fa"
//types
import { UserT } from "@/types"

export default function DeleteCollectionModal({
	id: collectionId,
	user
}: {
	id: string
	user: UserT
}) {
	const [deleteCollection] = useDeleteCollectionMutation()
	const { toast } = useToast()

	const handleDeleteCollection = async (collectionId: string) => {
		try {
			await deleteCollection({ userId: user?.uid, collectionId: collectionId })
			toast({
				variant: "default",
				description: "Your collection has been successfully deleted."
			})
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger aria-label="Delete collection">
				<FaRegTrashAlt size={20} />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						collection and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDeleteCollection(collectionId)}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
