import Image from "next/image"
import heroImg from "@/../public/assets/hero-img.jpg"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Image
				src={heroImg}
				alt="Space"
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{ objectFit: "cover" }}
				className="z-[-50] opacity-50"
			/>
		</main>
	)
}
