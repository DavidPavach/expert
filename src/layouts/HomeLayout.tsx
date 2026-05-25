import Footer from "#/components/Footer";
import HomeNav from "#/components/HomeNav";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<HomeNav />
			<section>{children}</section>
			<Footer />
		</main>
	);
};

export default HomeLayout;
