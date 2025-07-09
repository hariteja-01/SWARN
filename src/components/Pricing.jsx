import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

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
		accent: "#00BFFF",
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
		accent: "#FFD700",
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
		accent: "#7F00FF",
	},
];

const zigzag = [
	"md:translate-y-8",
	"md:-translate-y-8",
	"md:translate-y-8",
];

const cardVariants = {
	offscreen: { opacity: 0, y: 60, scale: 0.9 },
	onscreen: (i) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			bounce: 0.24,
			duration: 0.8,
			delay: i * 0.18,
		},
	}),
};

const Pricing = () => (
	<section className="py-24 bg-dark" id="plans">
		<h2 className="text-4xl font-bold text-center mb-16 text-white">
			Plans & Pricing
		</h2>
		<div className="w-full flex flex-col md:flex-row md:justify-center md:items-end gap-10 md:gap-12 relative">
			{plans.map((plan, i) => (
				<motion.div
					key={plan.name}
					className={`mx-auto md:mx-0 ${zigzag[i % zigzag.length]}`}
					custom={i}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ once: true, amount: 0.3 }}
					variants={cardVariants}
				>
					<StyledWrapper accent={plan.accent}>
						<div className="outer">
							<div className="dot" />
							<div className="card">
								<div className="ray" />
								<div className="text">{plan.price}</div>
								<div
									style={{
										fontWeight: "bold",
										fontSize: "1.3rem",
										marginBottom: 8,
									}}
								>
									{plan.name}
								</div>
								<div
									style={{
										fontSize: "1.1rem",
										marginBottom: 12,
										color: "#fff9",
									}}
								>
									{plan.duration}
								</div>
								<ul
									style={{
										margin: 0,
										padding: 0,
										listStyle: "none",
										color: "#fff",
										fontSize: "1rem",
										marginBottom: 16,
									}}
								>
									{plan.features.map((f) => (
										<li
											key={f}
											style={{
												display: "flex",
												alignItems: "center",
												gap: 6,
												marginBottom: 2,
											}}
										>
											<span
												style={{
													color: plan.accent,
													fontWeight: 900,
												}}
											>
												✔
											</span>
											<span>{f}</span>
										</li>
									))}
								</ul>
								<button
									className={`w-[80%] mx-auto py-2 rounded-xl font-bold transition btn-neon ${
										i === 1 ? "mb-8" : "mb-7"
									}`}
									style={{
										background: plan.accent,
										color: "#181c2f",
										border: "none",
										marginTop: 8,
										fontSize: "1.1rem",
										boxShadow: "0 0 16px " + plan.accent + "88",
									}}
								>
									Choose
								</button>
								<div className="line topl" />
								<div className="line leftl" />
								<div className="line bottoml" />
								<div className="line rightl" />
							</div>
						</div>
					</StyledWrapper>
				</motion.div>
			))}
		</div>
	</section>
);

const StyledWrapper = styled.div`
	.outer {
		width: 300px;
		height: 420px;
		border-radius: 16px;
		padding: 1px;
		background: radial-gradient(
				circle 230px at 0% 0%,
				#ffffff22,
				#0c0d0d 90%
			),
			linear-gradient(45deg, #000, #000);
		position: relative;
		margin-bottom: 0;
	}

	.dot {
		width: 8px;
		aspect-ratio: 1;
		position: absolute;
		background-color: ${({ accent }) => accent || "#fff"};
		box-shadow: 0 0 18px ${({ accent }) => accent || "#fff"};
		border-radius: 100px;
		z-index: 2;
		right: 10%;
		top: 10%;
		animation: moveDot 6s linear infinite;
	}

	@keyframes moveDot {
		0%,
		100% {
			top: 10%;
			right: 10%;
		}
		25% {
			top: 10%;
			right: calc(100% - 35px);
		}
		50% {
			top: calc(100% - 30px);
			right: calc(100% - 35px);
		}
		75% {
			top: calc(100% - 30px);
			right: 10%;
		}
	}

	.card {
		z-index: 1;
		width: 100%;
		height: 100%;
		border-radius: 14px;
		border: solid 1.5px ${({ accent }) => accent || "#202222"};
		background-size: 20px 20px;
		background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d 90%);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		flex-direction: column;
		color: #fff;
		padding-top: 32px;
		box-shadow: 0 8px 32px 0 ${({ accent }) => accent || "#00BFFF"}33;
		overflow: hidden;
	}
	.ray {
		width: 220px;
		height: 45px;
		border-radius: 100px;
		position: absolute;
		background-color: ${({ accent }) => accent || "#c7c7c7"};
		opacity: 0.25;
		box-shadow: 0 0 50px #fff;
		filter: blur(10px);
		transform-origin: 10%;
		top: 0%;
		left: 0;
		transform: rotate(40deg);
	}

	.card .text {
		font-weight: bolder;
		font-size: 3rem;
		background: linear-gradient(
				45deg,
				${({ accent }) => accent || "#fff"} 4%,
				#fff,
				#000
			);
		background-clip: text;
		color: transparent;
		margin-bottom: 0.5rem;
	}

	.line {
		width: 100%;
		height: 1px;
		position: absolute;
		background-color: #2c2c2c;
	}
	.topl {
		top: 10%;
		background: linear-gradient(
				90deg,
				${({ accent }) => accent || "#888888"} 30%,
				#1d1f1f 70%
			);
	}
	.bottoml {
		bottom: 10%;
	}
	.leftl {
		left: 10%;
		width: 1px;
		height: 100%;
		background: linear-gradient(
				180deg,
				${({ accent }) => accent || "#747474"} 30%,
				#222424 70%
			);
	}
	.rightl {
		right: 10%;
		width: 1px;
		height: 100%;
	}
`;

export default Pricing;