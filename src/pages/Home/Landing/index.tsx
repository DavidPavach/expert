import CTASection from "./CTA";
import DashboardShowcase from "./Dashboard";
import FAQSection from "./Faq";
import FeaturesSection from "./Features";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import MarketCategories from "./Market";
import MobileAppSection from "./Mobile";
import Testimonials from "./Testimonial";
import TrustSection from "./TrustSection";

const index = () => {
	return (
		<main>
			<HeroSection />
			<TrustSection />
			<FeaturesSection />
			<DashboardShowcase />
			<MarketCategories />
			<HowItWorks />
			<Testimonials />
			<MobileAppSection />
			<FAQSection />
			<CTASection />
		</main>
	);
};

export default index;
