
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ApiKeyInput from "@/components/ApiKeyInput";
import UrlInput from "@/components/UrlInput";
import SummarizeButton from "@/components/SummarizeButton";
import SummaryResult from "@/components/SummaryResult";
import { extractPageContent, fetchUrlContent, generateSummary, ScrapedContent } from "@/services/SummaryService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("webpage");
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent | null>(null);

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
      setScrapedContent(content);
      
      if (!content.content) {
        toast.error("Could not extract content from this page");
        setIsLoading(false);
        return;
      }

      // Generate summary using the Gemini API
      const result = await generateSummary(apiKey, content.content);
      
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

  const handleUrlSubmit = async (url: string) => {
    if (!apiKey) {
      toast.error("Please save your Gemini API key first");
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      // Fetch content from the provided URL
      const content = await fetchUrlContent(url);
      setScrapedContent(content);
      
      if (!content.content) {
        toast.error("Could not extract content from this URL");
        setIsLoading(false);
        return;
      }

      // Generate summary using the Gemini API
      const result = await generateSummary(apiKey, content.content);
      
      if (result.success && result.summary) {
        setSummary(result.summary);
      } else {
        toast.error(result.error || "Failed to generate summary");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      console.error("URL summarization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[400px] p-4 bg-gradient-to-br from-[#f9f8ff] to-[#e5deff] min-h-[500px]">
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center text-primary mb-2">Breezy Text Summarizer</h1>
        
        <Card className="border-purple-100 shadow-md">
          <CardContent className="p-4">
            <ApiKeyInput onApiKeySaved={handleApiKeySaved} />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="webpage" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="webpage" className="text-sm">Current Page</TabsTrigger>
            <TabsTrigger value="url" className="text-sm">URL Input</TabsTrigger>
          </TabsList>
          
          <TabsContent value="webpage" className="mt-0">
            <SummarizeButton 
              onSummarize={handleSummarize}
              isLoading={isLoading && activeTab === "webpage"}
              disabled={!apiKey}
            />
          </TabsContent>
          
          <TabsContent value="url" className="mt-0">
            <UrlInput 
              onUrlSubmit={handleUrlSubmit} 
              isLoading={isLoading && activeTab === "url"}
              disabled={!apiKey} 
            />
          </TabsContent>
        </Tabs>
        
        {isLoading && (
          <div className="flex justify-center items-center p-6">
            <div className="space-y-2">
              <div className="h-2 w-60 bg-purple-200 animate-pulse-opacity rounded"></div>
              <div className="h-2 w-40 bg-purple-200 animate-pulse-opacity rounded"></div>
              <div className="h-2 w-52 bg-purple-200 animate-pulse-opacity rounded"></div>
            </div>
          </div>
        )}
        
        {!isLoading && (summary || scrapedContent) && 
          <SummaryResult 
            summary={summary} 
            scrapedContent={scrapedContent || undefined} 
          />
        }
        
        {!isLoading && !summary && !scrapedContent && (
          <div className="text-center text-gray-500 p-6 bg-white/50 rounded-lg">
            <p>{activeTab === "webpage" ? 
              "Click \"Summarize This Page\" to generate a summary of the current webpage." : 
              "Enter a URL to generate a summary of that webpage."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
