
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Pure white background */}
      <div className="absolute inset-0 z-0 bg-white dark:bg-black"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
            <span className="text-foreground">
              Build Complete Projects
            </span>{" "}
            Instantly
          </h1>
          <p className="mt-6 text-xl text-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Choose your preferred creation method and get a ready-to-use project with both
            frontend and backend code.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/generate">
              <Button size="lg" className="bg-primary hover:opacity-90 shadow-lg shadow-gray-500/20 text-primary-foreground">
                Start with Templates
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="border-primary hover:border-primary/80 text-foreground">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
