import React from "react";
import { motion } from "framer-motion";

const plans = [
	{
		name: "Free Trial",
		price: "₹149",
		duration: "7 Days",
		features: [
			"AI Predictions (Limited)",
			"Portfolio Tracking",
			"Community Access",
		],
		highlight: false,
	},
	{
		name: "Pro Plan",
		price: "₹499",
		duration: "5 Months",
		features: [
			"All Free Features",
			"Full AI Insights",
			"Trading Automation",
			"Copy Trading",
			"Priority Support",
		],
		highlight: true,
	},
	{
		name: "Lifetime",
		price: "₹2999",
		duration: "Lifetime",
		features: [
			"All Pro Features",
			"Personal Coaching",
			"Exclusive Webinars",
			"Ad-Free Experience",
		],
		highlight: false,
	},
];

const Pricing = () => (
	<section className="py-24 bg-dark" id="plans">
		<h2 className="text-4xl font-bold text-center mb-16 text-secondary animate-fade-in">
			Plans & Pricing
		</h2>
		<div className="flex flex-col md:flex-row gap-10 justify-center items-center">
			{plans.map((plan, i) => (
				<motion.div
					key={plan.name}
					className={`glass-card rounded-3xl shadow-xl p-8 w-80 border-2 transition-all duration-300 ${
						plan.highlight
							? "border-primary scale-105 shadow-neon"
							: "border-gray-700"
					}`}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: i * 0.2, duration: 0.7 }}
					viewport={{ once: true }}
				>
					<h3 className="text-2xl font-bold mb-2 text-primary">
						{plan.name}
					</h3>
					<div className="text-4xl font-extrabold mb-2">{plan.price}</div>
					<div className="mb-4 text-light">{plan.duration}</div>
					<ul className="mb-6 space-y-2">
						{plan.features.map((f) => (
							<li key={f} className="flex items-center gap-2">
								<span className="text-secondary">✔</span>
								<span>{f}</span>
							</li>
						))}
					</ul>
					<button className="w-full py-2 rounded-xl bg-primary text-dark font-bold hover:bg-secondary transition">
						Choose
					</button>
				</motion.div>
			))}
		</div>
	</section>
);

export default Pricing;