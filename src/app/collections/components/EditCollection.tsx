import { useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { MdEdit } from "react-icons/md"
//types
import { UserT } from "@/types"
import { useEditCollectionMutation } from "@/redux/features/collectionsApiSlice"

type FormProps = {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type EditCollectionProps = {
	user: UserT
	id: string
	title: string
	description: string
	isPublic: boolean
}

type CombinedProps = FormProps & EditCollectionProps

function EditCollectionForm({
	user,
	setOpen,
	id: collectionId,
	title: collectionTitle,
	description: collectionDescription,
	isPublic: collectionIsPublic
}: CombinedProps) {
	const [formData, setFormData] = useState({
		title: collectionTitle,
		description: collectionDescription,
		isPublic: collectionIsPublic
	})
	const [message, setMessage] = useState("")
	const [editCollection] = useEditCollectionMutation()
	const { toast } = useToast()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prevFormData) => {
			if (e.target.type === "checkbox") {
				return {
					...prevFormData,
					[e.target.name]: (e.target as HTMLInputElement).checked
				}
			}
			return { ...prevFormData, [e.target.name]: e.target.value }
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (formData.title.trim() === "") {
			setMessage("You must enter a title")
			return
		}

		try {
			setMessage("")
			await editCollection({
				data: formData,
				userId: user?.uid,
				collectionId: collectionId
			})
			setOpen(false)
			toast({
				variant: "default",
				description: "Your collection has been successfully edited."
			})
		} catch (error) {
			console.error("Error editing collection", error)
			toast({
				variant: "destructive",
				description: "Unable to edit your collection, please try again."
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 p-4 w-full"
		>
			<div>
				<Label
					htmlFor="title"
					className="text-xl"
				>
					Title
				</Label>
				<Input
					onChange={handleChange}
					defaultValue={formData.title}
					type="text"
					name="title"
					id="title"
					placeholder="Write a collection title e.g. Horror Games"
					autoFocus
					className="text-base md:text-lg h-16 mt-1"
				/>
				{message && <span className="text-red-500">{message}</span>}
			</div>

			<div>
				<Label
					htmlFor="title"
					className="text-xl"
				>
					Description
				</Label>
				<Textarea
					onChange={handleChange}
					defaultValue={formData.description}
					name="description"
					id="description"
					placeholder="Write a description"
					maxLength={500}
					className="text-base md:text-lg mt-1 resize-none h-32"
				/>
			</div>
			<div className="flex items-center gap-2">
				<input
					onChange={handleChange}
					defaultChecked={formData.isPublic}
					type="checkbox"
					name="isPublic"
					id="isPublic"
					className="h-6 w-6"
				/>
				<Label
					htmlFor="title"
					className="text-xl"
				>
					Collection is visible to everyone
				</Label>
			</div>
			<div className="flex flex-col gap-4 justify-center items-center w-full mt-5">
				<Button
					className="text-lg w-full max-w-[500px]"
					disabled={!formData.title}
				>
					Submit
				</Button>

				<Button
					onClick={() => setOpen(false)}
					variant={"outline"}
					type="button"
					className="text-lg w-full max-w-[500px]"
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default function EditCollection({
	user,
	id,
	title,
	description,
	isPublic
}: EditCollectionProps) {
	const [open, setOpen] = useState(false)
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger
				aria-label="Edit collection"
				className="underline"
			>
				<MdEdit size={20} />
			</DialogTrigger>
			<DialogContent className="flex flex-col justify-center items-center w-full max-w-[1000px]">
				<DialogHeader>
					<DialogTitle className="text-3xl sm:text-4xl md:text-5xl">
						Edit {title} collection
					</DialogTitle>
				</DialogHeader>
				<EditCollectionForm
					user={user}
					setOpen={setOpen}
					id={id}
					title={title}
					description={description}
					isPublic={isPublic}
				/>
			</DialogContent>
		</Dialog>
	)
}
