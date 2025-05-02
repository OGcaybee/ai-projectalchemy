
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCustomizationForm from "@/components/ai/ProjectCustomizationForm";
import AIPlusGenerator from "@/components/ai/AIPlusGenerator";

const Generate: React.FC = () => {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 dark:from-gray-950 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Generate Your Project
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Choose a generation method and customize your project requirements
          </p>

          <div className="relative">
            {/* Decorative elements with dark mode adjustments */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/20 dark:bg-purple-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="templates" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Template-Based
                </TabsTrigger>
                <TabsTrigger value="aiplus" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  AI+ (No Templates)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="mt-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-1">
                  <ProjectCustomizationForm />
                </div>
              </TabsContent>
              
              <TabsContent value="aiplus" className="mt-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-1">
                  <AIPlusGenerator />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
