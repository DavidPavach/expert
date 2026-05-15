import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Header from "#/components/Header";
import { BottomNav, SideNav } from "#/components/Nav";
import { useMeStore } from "#/stores/me.store";
import { useSettingsStore } from "#/stores/settings.store";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient();

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		const init = async () => {
			await useMeStore.getState().ensureUser(queryClient);
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
					<Header />
					<section className="mb-20 md:mb-0 p-2 md:p-4 xl:p-6 overflow-y-auto">
						{children}
					</section>
				</aside>
			</section>

			<BottomNav />
		</main>
	);
};

export default UserLayout;
