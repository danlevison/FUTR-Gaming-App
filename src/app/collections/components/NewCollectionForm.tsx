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

export default function NewCollectionForm({ user }: NewCollectionFormProps) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		isPublic: false
	})
	const [message, setMessage] = useState("")
	const [openDrawer, setOpenDrawer] = useState(false)
	const collectionId = crypto.randomUUID()
	const { toast } = useToast()
	const [addCollection] = useAddCollectionMutation()

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
			setOpenDrawer(false)
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
		<Drawer
			open={openDrawer}
			onRelease={() => setOpenDrawer(!openDrawer)}
		>
			<DrawerTrigger
				onClick={() => setOpenDrawer(true)}
				className="underline mb-2"
			>
				Start a new collection
			</DrawerTrigger>
			<DrawerContent className="flex flex-col justify-center items-center">
				<DrawerHeader>
					<DrawerTitle className="text-3xl sm:text-4xl md:text-5xl">
						Start a new collection
					</DrawerTitle>
					<Button
						onClick={() => setOpenDrawer(false)}
						variant={"ghost"}
						aria-label="Close drawer"
						className="absolute top-5 right-5"
					>
						<MdClose size={30} />
					</Button>
				</DrawerHeader>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4 p-4 w-full max-w-[700px]"
				>
					<div>
						<Label
							htmlFor="title"
							className="text-xl"
						>
							Title*
						</Label>
						<Input
							onChange={handleChange}
							value={formData.title}
							type="text"
							name="title"
							id="title"
							placeholder="Write a collection title e.g. Horror Games"
							className="h-16 text-lg mt-1"
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
							className="h-16 text-lg mt-1"
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
							onClick={() => setOpenDrawer(false)}
							variant={"outline"}
							type="button"
							className="text-lg"
						>
							Cancel
						</Button>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	)
}
