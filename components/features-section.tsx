"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Mic, TrendingUp, Store, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Modern Interface",
    description: "Sleek, intuitive design that makes managing your collection a pleasure. Built with the latest technology for the best user experience.",
    badge: "Beautiful",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Mic,
    title: "Voice-Activated Cataloging",
    description: "Add items to your collection hands-free. Simply describe your collectible, and our AI does the rest — no typing required.",
    badge: "Innovative",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Valuation",
    description: "Get accurate, real-time price estimates powered by advanced AI. Our system scans the web to determine the true value of your collectibles.",
    badge: "Smart",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Store,
    title: "Built-in Marketplace",
    description: "Buy, sell, and trade with other collectors in our secure marketplace. Connect with enthusiasts who share your passion.",
    badge: "Social",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Collection Insurance",
    description: "Protect your valuable collections with integrated insurance options. Peace of mind for your prized possessions.",
    badge: "Secure",
    color: "from-orange-500 to-amber-500",
  },
];

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your{" "}
            <span className="bg-gradient-to-r from-sakobi-pink to-sakobi-purple bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sakobi combines cutting-edge technology with a passionate community
            to revolutionize how you collect.
          </p>
          <Separator className="max-w-xs mx-auto mt-8" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-sakobi-pink/20 group">
                  <CardHeader>
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-sakobi-navy to-sakobi-purple border-none">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                More Than Just an App
              </h3>
              <p className="text-gray-200 text-lg">
                We're building a <strong>social network for collectors</strong> where you can
                connect with like-minded enthusiasts, share your finds, and grow your
                collection with confidence.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
