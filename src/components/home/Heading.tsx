type HeadingT = {
	heading: { firstText: string; secondText: string }
}

export default function Heading({ heading }: HeadingT) {
	return (
		<div className="flex flex-col items-center text-center">
			<h2 className="font-bold uppercase text-3xl sm:text-4xl tracking-wider">
				{heading.firstText}{" "}
				<span className="text-accentSecondary">{heading.secondText}</span>
			</h2>
			<div className="w-[100px] h-1 mt-3 rounded-md bg-accentPrimary" />
		</div>
	)
}
