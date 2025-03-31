
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureCards = () => {
  const features = [
    {
      id: "ai",
      title: "Generate with AI",
      description: "Let our AI understand your needs and generate a complete project tailored for you.",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-purple-100 text-brand-purple mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ),
      details: "Let our AI understand your needs and generate a complete project tailored for you.",
      buttonText: "Start with AI",
      link: "/generate"
    },
    {
      id: "templates",
      title: "Use Templates",
      description: "Choose from our curated templates and customize them to fit your specific needs.",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-blue-100 text-blue-600 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L12 3L4 7" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 17L12 21L20 17" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12L12 16L20 12" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 7V17" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 7V17" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V7" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17V21" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ),
      details: "Choose from our curated templates and customize them to fit your specific needs.",
      buttonText: "Browse Templates",
      link: "/templates"
    },
    {
      id: "expert",
      title: "Create by Expert",
      description: "Work with our professional developers to build a custom solution for your business.",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-yellow-100 text-yellow-600 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ),
      details: "Work with our professional developers to build a custom solution for your business.",
      buttonText: "Contact Experts",
      link: "#contact-form",
      premium: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.id} className="card-hover h-full relative overflow-hidden">
              {feature.premium && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
              )}
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <CardDescription className="mb-6">
                  {feature.description}
                </CardDescription>
                <Link to={feature.link} className="mt-auto">
                  <Button 
                    variant={index === 0 ? "default" : index === 1 ? "outline" : "secondary"}
                    className={index === 0 ? "bg-brand-purple hover:bg-brand-purple/90" : ""}
                  >
                    {feature.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
