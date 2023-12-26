import { useState } from "react"
import { MdClose } from "react-icons/md"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	DrawerFooter
} from "@/components/ui/drawer"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAddCollectionMutation } from "@/redux/features/collectionsApiSlice"

type NewCollectionFormProps = {
	user: {
		uid: string
		displayName: string
		email: string
	}
}

type FormProps = {
	user: {
		uid: string
		displayName: string
		email: string
	}
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddNewCollectionForm({ user, setOpen }: FormProps) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		isPublic: false
	})
	const [addCollection] = useAddCollectionMutation()
	const [message, setMessage] = useState("")
	const collectionId = crypto.randomUUID()
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

		if (!user) {
			console.error("User not authenticated.")
			return
		}

		if (formData.title.trim() === "") {
			setMessage("You must enter a title")
			return
		}

		try {
			setMessage("")
			await addCollection({
				data: formData,
				userId: user.uid,
				collectionId: collectionId
			})

			setFormData({ title: "", description: "", isPublic: false })
			setOpen(false)
			toast({
				variant: "default",
				description: "Your collection has been successfully created."
			})
		} catch (error) {
			console.error("Error creating collection", error)
			toast({
				variant: "destructive",
				description: "Unable to create your collection, please try again."
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
					value={formData.title}
					type="text"
					name="title"
					id="title"
					placeholder="Write a collection title e.g. Horror Games"
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
					value={formData.description}
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
					checked={formData.isPublic}
					type="checkbox"
					name="isPublic"
					id="isPublic"
					className="h-6 w-6"
				/>
				<Label
					htmlFor="title"
					className="text-xl"
				>
					Collection is only visible to me
				</Label>
			</div>
			<DrawerFooter className="w-full max-w-[500px] mx-auto">
				<Button
					className="text-lg"
					disabled={!formData.title}
				>
					Submit
				</Button>

				<Button
					onClick={() => setOpen(false)}
					variant={"outline"}
					type="button"
					className="text-lg"
				>
					Cancel
				</Button>
			</DrawerFooter>
		</form>
	)
}

export default function AddNewCollection({ user }: NewCollectionFormProps) {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger className="underline mb-2">
					Start a new collection +
				</DialogTrigger>
				<DialogContent className="flex flex-col justify-center items-center w-full max-w-[1000px]">
					<DialogHeader>
						<DialogTitle className="text-3xl sm:text-4xl md:text-5xl">
							Start a new collection
						</DialogTitle>
					</DialogHeader>
					<AddNewCollectionForm
						user={user}
						setOpen={setOpen}
					/>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger
				onClick={() => setOpen(true)}
				className="underline mb-2"
			>
				Start a new collection +
			</DrawerTrigger>
			<DrawerContent className="flex flex-col justify-center items-center">
				<DrawerHeader>
					<DrawerTitle className="text-3xl sm:text-4xl md:text-5xl">
						Start a new collection
					</DrawerTitle>
					<Button
						onClick={() => setOpen(false)}
						variant={"ghost"}
						aria-label="Close drawer"
						className="absolute top-0 right-0"
					>
						<MdClose size={25} />
					</Button>
				</DrawerHeader>
				<AddNewCollectionForm
					user={user}
					setOpen={setOpen}
				/>
			</DrawerContent>
		</Drawer>
	)
}
