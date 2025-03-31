
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPricingPlans, PricingPlan } from "@/services/pricingService";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Pricing = () => {
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPricingPlans();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getAdjustedPrice = (price: number): number => {
    if (interval === "year") {
      // Apply 20% discount for yearly billing
      return Math.round(price * 12 * 0.8);
    }
    return price;
  };

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to subscribe to a plan");
      return;
    }
    
    // This would normally redirect to a payment page or process
    toast.success(`Subscribing to ${planId} plan`);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>

          <div className="flex items-center justify-center mt-8">
            <div className="bg-white p-1 rounded-full flex">
              <Button
                variant={interval === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setInterval("month")}
                className={interval === "month" ? "bg-brand-purple hover:bg-brand-purple/90" : ""}
              >
                Monthly
              </Button>
              <Button
                variant={interval === "year" ? "default" : "ghost"}
                size="sm"
                onClick={() => setInterval("year")}
                className={interval === "year" ? "bg-brand-purple hover:bg-brand-purple/90" : ""}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="relative animate-pulse">
                    <CardHeader className="pb-8">
                      <div className="h-7 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/2 mb-1"></div>
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-gray-200 mr-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                          </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </CardFooter>
                  </Card>
                ))
            : plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden ${
                    plan.isPopular ? "border-brand-purple shadow-lg" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs px-3 py-1">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        ${getAdjustedPrice(plan.price)}
                      </span>
                      <span className="text-gray-500 ml-2">
                        {interval === "month" ? "/month" : "/year"}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.id === "free"
                        ? "Perfect for getting started"
                        : plan.id === "pro"
                        ? "Best for individual professionals"
                        : "Ideal for teams and businesses"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {isAuthenticated ? (
                      <Button
                        onClick={() => handleSubscribe(plan.id)}
                        className={`w-full ${
                          plan.isPopular
                            ? "bg-brand-purple hover:bg-brand-purple/90"
                            : ""
                        }`}
                        variant={plan.isPopular ? "default" : "outline"}
                      >
                        {plan.buttonText}
                      </Button>
                    ) : (
                      <Link to="/login" className="w-full">
                        <Button
                          className={`w-full ${
                            plan.isPopular
                              ? "bg-brand-purple hover:bg-brand-purple/90"
                              : ""
                          }`}
                          variant={plan.isPopular ? "default" : "outline"}
                        >
                          Login to Subscribe
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
        </div>

        <div className="mt-16 bg-gray-100 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer custom plans for enterprise clients with specific needs.
              Contact our sales team to get a tailored quote.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
