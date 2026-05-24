export type KycFormData = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dateOfBirth: string;
	socialMediaUsername: string;

	streetAddress: string;
	city: string;
	stateProvince: string;
	countryNationality: string;

	documentType:
		| "International Passport"
		| "Drivers License"
		| "National ID Card"
		| "";

	frontSide: File | null;
	backSide: File | null;
};

export const INITIAL_KYC_FORM: KycFormData = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	dateOfBirth: "",
	socialMediaUsername: "",

	streetAddress: "",
	city: "",
	stateProvince: "",
	countryNationality: "",

	documentType: "",

	frontSide: null,
	backSide: null,
};
