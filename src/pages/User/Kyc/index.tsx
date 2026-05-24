import { useState } from "react";
import { toast } from "react-fox-toast";
import { useMeStore } from "#/stores/me.store";

// UIs
import Form from "./Form";
import Preview from "./Preview";

const Index = () => {
	const { user } = useMeStore();
	const [showForm, setShowForm] = useState<boolean>(false);

	const toggleShow = () => {
		if (!user) return;

		const { kycStatus } = user;
		if (kycStatus === "NOT STARTED" || kycStatus === "REJECTED") {
			setShowForm((prev) => !prev);
			return;
		}

		toast.error(`KYC already submitted. Current status: ${kycStatus}`);
	};

	return (
		<>
			{!showForm ? (
				<Preview onVerify={toggleShow} />
			) : (
				<Form onClose={toggleShow} />
			)}
		</>
	);
};

export default Index;
