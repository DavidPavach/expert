import { useState } from "react";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useReferrals } from "#/services/queries.service";
import ExpertCardError from "../Copy/ErrorCard";
import ReferralBox from "../Dashboard/Referral";
import ReferralLoader from "./ReferralLoader";
import ReferralTable from "./ReferralTable";

const index = () => {
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useReferrals(page, PAGE_LIMIT);

	const referrals = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isLoading) {
		return <ReferralLoader />;
	}

	if (isError) {
		return (
			<ExpertCardError message="Failed to load referrals." retry={refetch} />
		);
	}

	return (
		<main>
			<ReferralBox />
			<ReferralTable referrals={referrals} />
			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}
		</main>
	);
};

export default index;
