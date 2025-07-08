import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aiPrediction from "../assets/ai-prediction.json";
import portfolio3d from "../assets/portfolio-3d.json";
import automation3d from "../assets/automation-3d.json";
import community3d from "../assets/community-3d.json";

const features = [
	{
		title: "AI-Powered Predictions",
		desc: "Harness advanced machine learning for accurate stock forecasts and real-time market insights.",
		lottie: aiPrediction,
	},
	{
		title: "Portfolio & Risk Management",
		desc: "Track, optimize, and protect your investments with AI-driven strategies and loss compensation.",
		lottie: portfolio3d,
	},
	{
		title: "Smart Trading Automation",
		desc: "Automate trades, set custom strategies, and copy top traders with our intelligent trading bot.",
		lottie: automation3d,
	},
	{
		title: "Community & Social Trading",
		desc: "Learn, share, and grow with a vibrant community, leaderboards, and live expert sessions.",
		lottie: community3d,
	},
];

const Features = () => (
	<section className="py-24 bg-dark" id="features">
		<h2 className="text-4xl font-bold text-center mb-16 text-secondary animate-fade-in">
			Features
		</h2>
		<div className="flex flex-col gap-20 max-w-5xl mx-auto">
			{features.map((f, i) => (
				<motion.div
					key={f.title}
					className={`glass-card flex flex-col md:flex-row items-center gap-10 p-8 shadow-glass ${
						i % 2 === 1 ? "md:flex-row-reverse" : ""
					}`}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: i * 0.2 }}
					viewport={{ once: true }}
				>
					<div className="w-full md:w-1/2 icon-animated">
						<Lottie animationData={f.lottie} loop={true} />
					</div>
					<div className="w-full md:w-1/2">
						<h3 className="text-3xl font-bold mb-4 text-primary">
							{f.title}
						</h3>
						<p className="text-xl text-light">{f.desc}</p>
					</div>
				</motion.div>
			))}
		</div>
	</section>
);

export default Features;