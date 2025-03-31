
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Code, Users } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      id: "ai",
      title: "Generate with AI",
      description: "Let our AI understand your needs and generate a complete project tailored for you.",
      icon: (
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-purple-100 text-brand-purple mb-4">
          <Bot className="h-6 w-6" />
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
          <Code className="h-6 w-6" />
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
          <Users className="h-6 w-6" />
        </div>
      ),
      details: "Work with our professional developers to build a custom solution for your business.",
      buttonText: "Contact Experts",
      link: "/create-by-experts",
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
