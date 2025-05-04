
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ApiKeyInput from "@/components/ApiKeyInput";
import SummarizeButton from "@/components/SummarizeButton";
import SummaryResult from "@/components/SummaryResult";
import { extractPageContent, generateSummary } from "@/services/SummaryService";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");

  const handleApiKeySaved = (key: string) => {
    setApiKey(key);
  };

  const handleSummarize = async () => {
    if (!apiKey) {
      toast.error("Please save your Gemini API key first");
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      // Extract content from the current page
      const content = await extractPageContent();
      
      if (!content) {
        toast.error("Could not extract content from this page");
        setIsLoading(false);
        return;
      }

      // Generate summary using the Gemini API
      const result = await generateSummary(apiKey, content);
      
      if (result.success && result.summary) {
        setSummary(result.summary);
      } else {
        toast.error(result.error || "Failed to generate summary");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      console.error("Summarization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[400px] p-4 bg-gradient-to-br from-white to-secondary min-h-[500px]">
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center text-primary">Breezy Text Summarizer</h1>
        
        <Card className="p-4">
          <ApiKeyInput onApiKeySaved={handleApiKeySaved} />
        </Card>
        
        <SummarizeButton 
          onSummarize={handleSummarize}
          isLoading={isLoading}
          disabled={!apiKey}
        />
        
        {isLoading && (
          <div className="flex justify-center items-center p-6">
            <div className="space-y-2">
              <div className="h-2 w-60 bg-secondary animate-pulse-opacity rounded"></div>
              <div className="h-2 w-40 bg-secondary animate-pulse-opacity rounded"></div>
              <div className="h-2 w-52 bg-secondary animate-pulse-opacity rounded"></div>
            </div>
          </div>
        )}
        
        {!isLoading && summary && <SummaryResult summary={summary} />}
        
        {!isLoading && !summary && (
          <div className="text-center text-gray-500 p-6">
            <p>Click "Summarize This Page" to generate a summary of the current webpage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
