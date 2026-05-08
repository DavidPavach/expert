// UIs
import CountrySelect from "./CountrySelect";

const LocationForm = ({
	update,
}: {
	update: (field: string, value: string | boolean | number) => void;
}) => {
	return (
		<main>
			<CountrySelect update={update} />
			<div className="flex gap-3 bg-primary/5 p-4 border border-border rounded-xl">
				<div className="flex justify-center items-center bg-primary/20 mt-0.5 rounded-full size-5 shrink-0">
					<span className="font-bold text-primary text-xs">i</span>
				</div>
				<div>
					<p className="mb-1 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
						Regional Trading Information
					</p>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
						Your location helps us provide region-specific features, compliance,
						and optimal server connections for faster trading execution.
					</p>
				</div>
			</div>
		</main>
	);
};

export default LocationForm;
