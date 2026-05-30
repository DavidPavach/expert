const ErrorText = ({ message }: { message: string | undefined }) => {
	return (
		<p className="mt-1 text-[11px] text-destructive md:text-xs xl:text-sm">
			{message}
		</p>
	);
};

export default ErrorText;
