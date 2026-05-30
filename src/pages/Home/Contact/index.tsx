import { motion } from "framer-motion";
import { Call, Clock, Send2, Sms } from "iconsax-reactjs";
import { MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactInfo = [
	{
		icon: Sms,
		label: "Email Us",
		value: "support@expertmirrorcon.com",
		sub: "We respond within 2 hours",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		icon: Call,
		label: "Call Us",
		value: "+1 (800) 442-7891",
		sub: "24/7 for Premium accounts",
		color: "text-emerald-500",
		bg: "bg-emerald-500/10",
	},
	{
		icon: MapPin,
		label: "Headquarters",
		value: "One Canada Square, London",
		sub: "Canary Wharf, E14 5AB",
		color: "text-blue-500",
		bg: "bg-blue-500/10",
	},
	{
		icon: Clock,
		label: "Support Hours",
		value: "24/7 Live Chat",
		sub: "Phone: Mon–Fri 8am–8pm GMT",
		color: "text-amber-500",
		bg: "bg-amber-500/10",
	},
];

const departments = [
	"General Inquiry",
	"Account Support",
	"Technical Issue",
	"Partnership",
	"Press & Media",
	"Compliance",
];

export default function Contact() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		department: "",
		message: "",
	});
	const [sent, setSent] = useState(false);

	const handleSubmit = () => {
		setSent(true);
		const to = "support@expertmirrorcon.com";
		const subject = encodeURIComponent(
			`Support request from ${form.name || "Unknown"}`,
		);
		const bodyLines = [
			`Name: ${form.name || ""}`,
			`Email: ${form.email || ""}`,
			`Department: ${form.department || ""}`,
			"",
			"Message:",
			form.message || "",
		];
		const body = encodeURIComponent(bodyLines.join("\n"));
		const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
		window.location.href = mailto;
	};

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-28 hero-gradient">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
							Contact
						</span>
						<h1 className="mb-4 font-heading font-bold text-4xl sm:text-5xl lg:text-6xl">
							We're Here to <span className="gradient-text">Help</span>
						</h1>
						<p className="mx-auto max-w-xl text-muted-foreground text-lg">
							Our team of experts is available around the clock to answer your
							questions and support your trading journey.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Cards */}
			<section className="py-12 lg:py-16">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4 mb-14">
						{contactInfo.map((item, i) => (
							<motion.div
								key={item.label}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.08 }}
								className="p-6 rounded-2xl text-center glass-card"
							>
								<div
									className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-4`}
								>
									<item.icon className={`w-5 h-5 ${item.color}`} />
								</div>
								<h3 className="mb-1 font-semibold text-sm">{item.label}</h3>
								<p className="mb-0.5 font-medium text-foreground text-sm">
									{item.value}
								</p>
								<p className="text-muted-foreground text-xs">{item.sub}</p>
							</motion.div>
						))}
					</div>

					{/* Form + Live Chat */}
					<div className="gap-8 grid lg:grid-cols-5">
						{/* Form */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className="lg:col-span-3 p-6 lg:p-8 rounded-2xl glass-card-strong"
						>
							<h2 className="mb-1 font-heading font-bold text-base md:text-lg xl:text-xl">
								Send a Message
							</h2>
							<p className="mb-6 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Fill in the form and we'll get back to you within 2 hours.
							</p>

							{sent ? (
								<div className="py-10 text-center">
									<div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full size-10 md:size-12 xl:size-14">
										<Send2 className="size-5 md:size-6 xl:size-7 text-primary" />
									</div>
									<h3 className="mb-2 font-semibold text-sm md:text-base xl:text-lg">
										Message Sent!
									</h3>
									<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
										Our team will respond within 2 hours.
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="gap-4 grid sm:grid-cols-2">
										<div>
											<Label className="text-[11px] md:text-xs xl:text-sm">
												Full Name
											</Label>
											<Input
												placeholder="John Smith"
												value={form.name}
												onChange={(e) =>
													setForm({ ...form, name: e.target.value })
												}
												className="bg-muted/40 border-border/40"
												required
											/>
										</div>
										<div>
											<Label className="text-[11px] md:text-xs xl:text-sm">
												Email Address
											</Label>
											<Input
												type="email"
												placeholder="john@example.com"
												value={form.email}
												onChange={(e) =>
													setForm({ ...form, email: e.target.value })
												}
												className="bg-muted/40 border-border/40"
												required
											/>
										</div>
									</div>
									<div>
										<Label className="text-[11px] md:text-xs xl:text-sm">
											Department
										</Label>
										<select
											value={form.department}
											onChange={(e) =>
												setForm({ ...form, department: e.target.value })
											}
											className="bg-muted/40 px-3 border border-border/40 rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full h-9 text-foreground text-sm"
											required
										>
											<option value="">Select a department</option>
											{departments.map((d) => (
												<option key={d} value={d}>
													{d}
												</option>
											))}
										</select>
									</div>
									<div>
										<Label>Message</Label>
										<Textarea
											placeholder="How can we help you?"
											value={form.message}
											onChange={(e) =>
												setForm({ ...form, message: e.target.value })
											}
											className="bg-muted/40 border-border/40 h-32 resize-none"
											required
										/>
									</div>
									<Button
										type="button"
										onClick={handleSubmit}
										className="gap-2 bg-primary hover:bg-primary/90 w-full h-10 font-semibold text-primary-foreground"
									>
										<Send2 className="size-4 md:size-4.5 xl:size-5" /> Send
										Message
									</Button>
								</form>
							)}
						</motion.div>

						{/* Live Chat + Map */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 }}
							className="flex flex-col gap-5 lg:col-span-2"
						>
							<div className="p-4 md:p-5 xl:p-6 rounded-2xl glass-card-strong">
								<div className="flex items-center gap-3 mb-3">
									<div className="flex justify-center items-center bg-primary/10 rounded-xl size-8 md:size-9 xl:size-10">
										<MessageCircle className="size-4 md:size-4.5 xl:size-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-[11px] md:text-xs xl:text-sm">
											Live Chat
										</h3>
										<div className="flex items-center gap-1.5 mt-0.5">
											<span className="bg-emerald-400 rounded-full size-1.5 animate-pulse" />
											<span className="text-[10px] text-emerald-400 md:text-[11px] xl:text-xs">
												Online now
											</span>
										</div>
									</div>
								</div>
								<p className="mb-4 text-[11px] text-muted-foreground md:text-xs text-sm">
									Connect instantly with a trading specialist. Average response
									time: under 30 seconds.
								</p>
								<Button className="bg-primary hover:bg-primary/90 w-full h-9 font-semibold text-primary-foreground text-sm">
									Start Live Chat
								</Button>
							</div>

							<div className="flex-1 p-4 md:p-5 xl:p-6 rounded-2xl glass-card-strong">
								<h3 className="mb-3 font-semibold text-[11px] md:text-xs xl:text-sm">
									Global Offices
								</h3>
								<div className="space-y-3">
									{[
										{ city: "London", addr: "One Canada Square, Canary Wharf" },
										{
											city: "New York",
											addr: "1 World Trade Center, Suite 8500",
										},
										{ city: "Singapore", addr: "1 Raffles Place, #20-61" },
										{ city: "Dubai", addr: "DIFC, Gate District, Level 5" },
									].map((o) => (
										<div key={o.city} className="flex items-start gap-2.5">
											<MapPin className="mt-0.5 size-3.5 text-primary shrink-0" />
											<div>
												<p className="font-medium text-[11px] md:text-xs xl:text-sm">
													{o.city}
												</p>
												<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
													{o.addr}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
