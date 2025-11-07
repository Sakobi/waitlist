import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <WaitlistForm />

      {/* Footer */}
      <footer className="bg-sakobi-dark text-gray-400 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Sakobi. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
