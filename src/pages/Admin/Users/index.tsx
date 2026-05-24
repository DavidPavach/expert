import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { PAGE_LIMIT } from "#/enum";
import { useFetchUsers } from "#/services/queries.service";

const index = () => {
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useFetchUsers(page, PAGE_LIMIT);

	const users = data?.data?.data ?? [];
	console.log("The fetched users", users);

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isLoading) {
		return <AdminLoader />;
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	return (
		<main>
			<h1>The Users Page</h1>
		</main>
	);
};

export default index;
