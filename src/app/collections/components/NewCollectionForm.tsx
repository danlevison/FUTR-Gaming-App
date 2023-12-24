import {
	Drawer,
	DrawerClose,
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

export default function NewCollectionForm() {
	return (
		<Drawer>
			<DrawerTrigger className="underline mb-2">
				Start a new collection
			</DrawerTrigger>
			<DrawerContent className="flex flex-col justify-center items-center">
				<DrawerHeader>
					<DrawerTitle className="text-3xl sm:text-4xl md:text-5xl">
						Start a new collection
					</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col gap-4 p-4 w-full max-w-[700px]">
					<div>
						<Label
							htmlFor="title"
							className="text-xl"
						>
							Title
						</Label>
						<Input
							name="title"
							id="title"
							placeholder="Write a collection title e.g. Horror Games"
							className="h-16 text-lg mt-1"
						/>
					</div>

					<div>
						<Label
							htmlFor="title"
							className="text-xl"
						>
							Description
						</Label>
						<Textarea
							name="title"
							id="title"
							placeholder="Write a description"
							className="h-16 text-lg mt-1"
						/>
					</div>
				</div>

				<DrawerFooter className="w-full max-w-[500px]">
					<Button className="text-lg">Submit</Button>
					<DrawerClose asChild>
						<Button
							variant={"outline"}
							className="text-lg"
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
