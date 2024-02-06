import Link from "next/link"
import Image from "next/image"
import { MdArrowBackIosNew } from "react-icons/md"
import { SelectedUserT } from "@/types"

type MessageHeaderProps = {
	selectedUser: SelectedUserT
	setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MessageHeader({
	selectedUser,
	setShowChat
}: MessageHeaderProps) {
	return (
		<div className="flex justify-center items-center md:justify-start">
			{selectedUser.displayName && (
				<div className="w-full bg-blue-950 h-14 px-3 md:rounded-t-md flex justify-between items-center">
					<button
						onClick={() => setShowChat(false)}
						className="md:hidden"
						aria-label="Back to chats"
					>
						<MdArrowBackIosNew size={20} />
					</button>
					<Link
						href={`/user/${selectedUser.userId}`}
						className="flex items-center gap-2 hover:underline"
					>
						<Image
							src={selectedUser.avatar}
							alt={selectedUser.displayName}
							width={30}
							height={30}
							className="rounded-full"
						/>
						{selectedUser.displayName}
					</Link>
				</div>
			)}
		</div>
	)
}
