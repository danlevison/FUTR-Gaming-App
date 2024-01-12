export default function PageHeading({
	headingText
}: {
	headingText: string | undefined
}) {
	return (
		<h1 className="order-1 font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
			{headingText}
		</h1>
	)
}
