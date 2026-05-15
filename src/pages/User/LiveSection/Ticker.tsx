import { useEffect, useRef } from "react";

import { useThemeStore } from "@/stores/theme.store";

export default function TradingViewTickerTape() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const { theme } = useThemeStore();

	useEffect(() => {
		if (!containerRef.current) return;

		containerRef.current.innerHTML = `
            <div class="tradingview-widget-container__widget"></div>
        `;

		const script = document.createElement("script");

		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

		script.type = "text/javascript";
		script.async = true;

		script.innerHTML = JSON.stringify({
			symbols: [
				{
					proName: "FOREXCOM:SPXUSD",
					title: "S&P 500",
				},
				{
					proName: "FOREXCOM:NSXUSD",
					title: "Nasdaq 100",
				},
				{
					proName: "FOREXCOM:DJI",
					title: "Dow Jones",
				},
				{
					proName: "BITSTAMP:BTCUSD",
					title: "Bitcoin",
				},
				{
					proName: "BITSTAMP:ETHUSD",
					title: "Ethereum",
				},
				{
					proName: "CMCMARKETS:GOLD",
					title: "Gold",
				},
				{
					proName: "NASDAQ:NVDA",
					title: "NVIDIA",
				},
				{
					proName: "AMEX:SPY",
					title: "SPY",
				},
				{
					proName: "NASDAQ:QQQ",
					title: "QQQ",
				},
				{
					proName: "TVC:DXY",
					title: "US Dollar Index",
				},
			],
			showSymbolLogo: true,
			isTransparent: true,
			displayMode: "adaptive",
			colorTheme: theme === "dark" ? "dark" : "light",
			locale: "en",
		});

		containerRef.current.appendChild(script);
	}, [theme]);

	return (
		<section className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
			<div ref={containerRef} className="w-full tradingview-widget-container" />
		</section>
	);
}
