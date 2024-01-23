export default function ErrorDisplay({
	errorMessage
}: {
	errorMessage: string
}) {
	return <p className="text-3xl font-bold text-center">{errorMessage}</p>
}
