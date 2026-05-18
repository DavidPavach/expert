import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import AdminHeader from "#/components/AdminHeader";
import { BottomNav, SideNav } from "#/components/AdminNav";
import { useSettingsStore } from "#/stores/settings.store";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient();

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		const init = async () => {
			await useSettingsStore.getState().ensureSettings(queryClient);
		};

		init();
	}, []);

	return (
		<main className="flex flex-col">
			<section className="flex">
				<div className="hidden lg:block lg:w-[18rem]">
					<SideNav />
				</div>

				<aside className="flex-1 min-w-0">
					<AdminHeader />
					<section className="mb-20 md:mb-0 p-2 md:p-4 xl:p-6 overflow-y-auto">
						{children}
					</section>
				</aside>
			</section>

			<BottomNav />
		</main>
	);
};

export default AdminLayout;
