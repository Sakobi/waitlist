"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert([{ email: email.toLowerCase() }]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === "23505") {
          setStatus("error");
          setErrorMessage("This email is already on the waitlist!");
        } else {
          setStatus("error");
          setErrorMessage("Something went wrong. Please try again.");
        }
        console.error("Supabase error:", error);
      } else {
        setStatus("success");
        setEmail("");

        // Track successful signup in Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: 'email_signup'
          });
        }
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to join waitlist. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <section id="waitlist-form" className="py-24 bg-gradient-to-br from-sakobi-dark via-sakobi-navy to-sakobi-purple">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Don't Miss the Launch
            </h2>
            <p className="text-xl text-gray-300">
              Join our waitlist and be among the first to experience Sakobi when we launch.
            </p>
            <Separator className="max-w-xs mx-auto mt-6 bg-white/20" />
          </div>

          <Card className="shadow-2xl border-2 border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Join the Waitlist</CardTitle>
              <CardDescription className="text-base">
                Get early access and exclusive updates about Sakobi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining our waitlist. We'll notify you as soon as Sakobi launches.
                  </p>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="mt-4"
                  >
                    Sign up another email
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 text-base"
                        disabled={status === "loading"}
                        required
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-sakobi-pink to-sakobi-purple hover:from-sakobi-pink/90 hover:to-sakobi-purple/90 text-white font-semibold h-12 text-base"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="py-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex-1 max-w-xs">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sakobi-pink to-sakobi-purple"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <span className="text-white font-semibold text-lg">70%</span>
                </div>
                <p className="text-gray-300 mt-3 text-sm">
                  MVP development progress • We're almost ready for launch!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
