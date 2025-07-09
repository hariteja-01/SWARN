import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import features from "../assets/features-data";

const Features = () => (
	<section className="py-24 bg-dark" id="features">
		<h2 className="text-4xl font-bold text-center mb-16 text-primary">
			Features
		</h2>
		<div className="flex flex-col gap-8">
			{features.map((f, idx) => (
				<div
					key={f.title}
					className={`flex flex-col md:flex-row ${
						idx % 2 === 0 ? "" : "md:flex-row-reverse"
					} items-center gap-12`}
				>
					<motion.div
						className="w-full md:w-1/2 icon-animated"
						initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<Lottie animationData={f.lottie} loop={true} />
					</motion.div>
					<motion.div
						className="w-full md:w-1/2"
						initial={{ opacity: 0, x: idx % 2 === 0 ? 80 : -80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h3 className="text-3xl font-bold mb-4 text-primary">
							{f.title}
						</h3>
						<p className="text-xl text-light">{f.desc}</p>
					</motion.div>
				</div>
			))}
		</div>
	</section>
);

export default Features;