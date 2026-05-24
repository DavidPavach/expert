import { Headphone, Link, Send2, Sms } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";

// Components
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { useMeStore } from "#/stores/me.store";

const MAX_MESSAGE_LENGTH = 500;

const SupportPage = () => {
	const { user } = useMeStore();
	const [message, setMessage] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const remainingCharacters = MAX_MESSAGE_LENGTH - message.length;

	// Functions
	const toggleSubmitting = () => setIsSubmitting((prev) => !prev);

	const handleSubmit = async () => {
		toggleSubmitting();

		if (!message.trim()) {
			toggleSubmitting();
			return toast.error("Kindly enter a message");
		}

		const subject = "Support Request - ExpertMirrorCon";
		const body = `
                Name: ${user?.fullName}
                Email: ${user?.email}

                Message:
                ${message}
            `.trim();

		const mailtoLink = `mailto:support@expertmirrorcon.com?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(body)}`;

		setTimeout(() => {
			window.location.href = mailtoLink;
			setTimeout(() => {
				toggleSubmitting();
			}, 500);
		}, 1000);
	};

	return (
		<main className="py-6 md:py-8">
			{/* Header */}
			<header className="flex items-start gap-4 mb-8 md:mb-10">
				<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-14 md:size-16 shrink-0">
					<Headphone className="size-6 md:size-7 xl:size-8 text-primary" />
				</div>
				<div>
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
						Support Center
					</h1>
					<p className="mx-auto mt-2 max-w-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
						We're here to help you with any questions or concerns
					</p>
				</div>
			</header>

			{/* Support Card */}
			<section className="bg-card/50 shadow-xl backdrop-blur-sm mb-8 border border-border rounded-3xl overflow-hidden">
				<div className="flex md:flex-row flex-col items-start gap-5 p-4 md:p-6 xl:p-8">
					<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-10 md:size-12 xl:size-14 shrink-0">
						<Sms className="size-5 md:size-6 xl:size-7 text-primary" />
					</div>

					<div className="flex-1">
						<div className="mb-4">
							<h2 className="font-bold text-base md:text-lg xl:text-xl">
								Email Support
							</h2>
							<p className="text-muted-foreground">Get help via email</p>
						</div>
						<p className="mb-5 leading-relaxed">
							Direct email communication for detailed inquiries and support
							requests.
						</p>

						<a
							href="mailto:support@expertmirrorcon.com"
							className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
						>
							support@expertmirrorcon.com
							<Link className="size-4" />
						</a>
					</div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="bg-card/50 shadow-xl backdrop-blur-sm border border-border rounded-3xl">
				<div className="px-5 md:px-8 xl:px-12 py-8 md:py-10 xl:py-12">
					<header className="mx-auto mb-8 max-w-3xl text-center">
						<h2 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
							Send us a Message
						</h2>

						<p className="mt-3 text-muted-foreground leading-relaxed">
							Have a specific question or need assistance? Fill out the form
							below and our support team will get back to you as soon as
							possible.
						</p>
					</header>

					<section className="space-y-6 mx-auto max-w-3xl">
						{/* User Info */}
						<div className="gap-4 grid md:grid-cols-2">
							<div className="bg-accent/10 p-4 border border-border rounded-2xl">
								<Label className="text-muted-foreground text-xs md:text-sm">
									Your Name
								</Label>

								<div className="flex items-center gap-3 mt-3">
									<img
										src={user?.profilePicture}
										alt="User"
										className="rounded-full size-8 md:size-9 xl:size-10"
									/>
									<div className="min-w-0">
										<p className="font-semibold truncate capitalize">
											{user?.fullName}
										</p>
									</div>
								</div>
							</div>

							<div className="bg-accent/10 p-4 border border-border rounded-2xl">
								<Label className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									Your Email
								</Label>

								<div className="flex items-center gap-3 mt-3">
									<div className="flex justify-center items-center bg-background/50 rounded-full size-8 md:size-9 xl:size-10 shrink-0">
										<Sms className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
									</div>

									<div className="min-w-0">
										<p className="font-semibold truncate">{user?.email}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Message */}
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<Label htmlFor="message" className="font-semibold">
									Message <span className="text-destructive">*</span>
								</Label>

								<p
									className={`text-[11px] md:text-xs xl:text-sm ${
										remainingCharacters < 100
											? "text-amber-500"
											: "text-muted-foreground"
									}`}
								>
									{message.length}/{MAX_MESSAGE_LENGTH}
								</p>
							</div>

							<textarea
								id="message"
								value={message}
								maxLength={MAX_MESSAGE_LENGTH}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Please describe your issue or question in detail..."
								className="bg-accent/10 px-4 md:px-5 py-4 border border-border focus:border-primary/40 rounded-2xl outline-none focus:ring-0 w-full min-h-45 md:min-h-55 transition-all resize-none"
							/>

							<div className="flex md:flex-row flex-col justify-between md:items-center gap-2">
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									Please provide as much detail as possible to help us assist
									you better.
								</p>

								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									Response time: within 24 hours
								</p>
							</div>
						</div>

						{/* Submit */}
						<div className="pt-2">
							<Button
								type="button"
								onClick={handleSubmit}
								disabled={isSubmitting || !message.trim()}
								className="gap-2 shadow shadow-primary/20 w-full md:w-auto md:min-w-55 disabled:cursor-not-allowed"
							>
								{isSubmitting ? (
									<>
										<div className="border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full size-4 md:size-4.5 xl:size-5 animate-spin" />
										Sending...
									</>
								) : (
									<>
										<Send2 className="size-4 md:size-4.5 xl:size-5" />
										Send Message
									</>
								)}
							</Button>
						</div>
					</section>
				</div>
			</section>
		</main>
	);
};

export default SupportPage;
