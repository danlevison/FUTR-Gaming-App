import { Loader2 } from "lucide-react"

export default function Spinner() {
	const Icons = {
		spinner: Loader2
	}
	return <Icons.spinner className="h-20 w-20 animate-spin" />
}
