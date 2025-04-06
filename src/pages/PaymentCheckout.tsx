
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Lock, CreditCard, Calendar, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const PaymentCheckout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, upgradeToPro, updateCredits } = useAuth();
  
  // Get plan details from URL or default to Pro plan
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'pro';
  const isTopup = searchParams.get('type') === 'topup';
  const topupOption = searchParams.get('option') || '1';
  
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Define pricing plans
  const plans = {
    free: { name: "Free", price: 0, interval: "month" },
    pro: { name: "Pro", price: 1499, interval: "month" },
    team: { name: "Team", price: 3999, interval: "month" }
  };
  
  // Define topup options
  const topupOptions = {
    "1": { name: "10 AI Generations", price: 299, credits: 10 },
    "2": { name: "20 AI Generations", price: 499, credits: 20 },
    "3": { name: "50 AI Generations", price: 899, credits: 50 }
  };
  
  // Get current plan or topup details
  const currentPlan = isTopup 
    ? topupOptions[topupOption as keyof typeof topupOptions] 
    : plans[planId as keyof typeof plans];
  
  useEffect(() => {
    // Check if we have valid parameters
    if (!currentPlan) {
      toast.error("Invalid plan or topup option selected");
      navigate("/pricing");
    }
  }, [currentPlan, navigate]);
  
  const handlePayment = () => {
    // Validate form
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
        toast.error("Please fill in all card details");
        return;
      }
      
      // Simple validation for card number format
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      
      // Simple validation for expiry date
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return;
      }
      
      // Simple validation for CVC
      if (cardCvc.length !== 3) {
        toast.error("Please enter a valid 3-digit CVC");
        return;
      }
    } else if (paymentMethod === "upi") {
      const upiInput = document.getElementById("upi-id") as HTMLInputElement;
      if (!upiInput || !upiInput.value) {
        toast.error("Please enter your UPI ID");
        return;
      }
      
      if (!upiInput.value.includes('@')) {
        toast.error("Please enter a valid UPI ID");
        return;
      }
    }
    
    // Simulate payment processing
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      if (user) {
        if (isTopup && currentPlan) {
          // Add credits for topup
          const newCredits = (user.credits || 0) + currentPlan.credits;
          updateCredits(newCredits);
          
          toast.success(`Added ${currentPlan.credits} credits to your account!`);
        } else {
          // Upgrade to PRO for subscription
          upgradeToPro();
          
          toast.success(`You have been upgraded to ${currentPlan.name}!`);
        }
      } else {
        toast.error("You need to be logged in to complete this purchase.");
        navigate("/login");
        return;
      }
      
      // Redirect to success page
      navigate(isTopup ? "/generate" : "/templates");
    }, 1500);
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue.substring(0, 19)); // Limit to 16 digits (plus spaces)
  };
  
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 2) {
      setCardExpiry(value);
    } else {
      setCardExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Complete your {isTopup ? "top-up" : "subscription"} purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <div className="relative">
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            maxLength={5}
                          />
                          <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "upi" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="name@bank" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700" 
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay ₹${currentPlan?.price.toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{isTopup ? currentPlan?.name : `${currentPlan?.name} Plan`}</span>
                  <span>₹{currentPlan?.price.toFixed(2)}</span>
                </div>
                
                {!isTopup && (
                  <div className="text-sm text-gray-500">
                    Billed {currentPlan?.interval === "month" ? "monthly" : "yearly"}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{currentPlan?.price.toFixed(2)}</span>
                </div>
                
                {isTopup && (
                  <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-start text-sm">
                    <Check className="h-4 w-4 mr-2 mt-0.5" />
                    <span>You will receive {currentPlan?.credits} AI generation credits</span>
                  </div>
                )}
                
                {!isTopup && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">What's included:</div>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {planId === "pro" ? "Unlimited project generations" : "Team collaboration"}
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {planId === "pro" ? "Access to all templates" : "Custom branding"}
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {planId === "pro" ? "Advanced AI features" : "API access"}
                      </li>
                      <li className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        {planId === "pro" ? "Priority support" : "Dedicated support"}
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-800 text-sm">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
