import Link from "next/link"

export default function NotFound() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen w-full text-center px-5">
			<h1 className="text-5xl sm:text-7xl md:text-9xl font-bold">404</h1>
			<p className="text-2xl sm:text:3xl md:text-4xl">
				We couldn&apos;t find that page.
			</p>
			<Link
				href={"/"}
				className="bg-white text-foreground p-4 rounded-md mt-5 text-lg hover:opacity-70 duration-300"
			>
				Return to Home
			</Link>
		</main>
	)
}
