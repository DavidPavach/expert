import { motion } from "framer-motion";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		q: "How do I get started with Expertmirrorcon?",
		a: "Create an account in under 2 minutes, complete our streamlined KYC verification, and fund your wallet via bank transfer, card, or cryptocurrency. You can start trading immediately after your identity is verified.",
	},
	{
		q: "What markets can I trade on?",
		a: "Expertmirrorcon offers access to Forex (80+ pairs), Cryptocurrencies (200+ assets), Stocks (5,000+ equities), Commodities (30+ assets), and Global Indices (25+). All from a single unified trading interface.",
	},
	{
		q: "How secure is my money and data?",
		a: "We use bank-grade 256-bit encryption, multi-signature cold storage for digital assets, and institutional custody solutions. All user data is encrypted at rest and in transit. We are fully compliant with international financial regulations.",
	},
	{
		q: "What are the trading fees?",
		a: "We offer competitive, transparent pricing with no hidden fees. Spreads start from 0.1 pips on major forex pairs. Crypto trading fees start at 0.05%. Volume-based discounts are available for active traders.",
	},
	{
		q: "Can I use Expertmirrorcon on mobile?",
		a: "Yes. Our mobile app for iOS and Android offers the complete trading experience — including charts, order execution, portfolio management, and push notifications for price alerts and trade confirmations.",
	},
	{
		q: "Do you offer demo accounts?",
		a: "Absolutely. Every new user gets access to a fully-featured demo account with $100,000 in virtual funds. Practice strategies risk-free with live market data before committing real capital.",
	},
	{
		q: "What customer support is available?",
		a: "Our support team is available 24/7 via live chat, email, and phone. Premium account holders also get a dedicated account manager and priority support queue.",
	},
];

export default function FAQSection() {
	return (
		<section className="relative py-24 lg:py-32">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-3xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:*:text-xs uppercase tracking-widest">
						FAQ
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl md:text-4xl xl:text-5xl">
						Frequently Asked <span className="gradient-text">Questions</span>
					</h2>
					<p className="text-muted-foreground">
						Everything you need to know about getting started.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Accordion type="single" collapsible className="space-y-3">
						{faqs.map((faq, i) => (
							<AccordionItem
								key={`accordion_${
									// biome-ignore lint/suspicious/noArrayIndexKey: <>
									i
								}`}
								value={`faq-${i}`}
								className="px-4 md:px-5 xl:px-6 border-none rounded-xl glass-card"
							>
								<AccordionTrigger className="py-5 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm text-left hover:no-underline">
									{faq.q}
								</AccordionTrigger>
								<AccordionContent className="pb-5 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
									{faq.a}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
