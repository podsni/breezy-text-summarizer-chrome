
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle2, Link, Clock, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrapedContent } from "@/services/SummaryService";

interface SummaryResultProps {
  summary: string;
  scrapedContent?: ScrapedContent;
}

const SummaryResult = ({ summary, scrapedContent }: SummaryResultProps) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("summary");

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${type} copied to clipboard`);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!summary && !scrapedContent) {
    return null;
  }

  const formattedDate = scrapedContent?.metadata?.timestamp 
    ? new Date(scrapedContent.metadata.timestamp).toLocaleString() 
    : '';

  return (
    <Card className="w-full shadow-md border-purple-100 bg-gradient-to-br from-white to-[#f9f8ff]">
      <CardContent className="pt-4">
        {scrapedContent && (
          <div className="mb-4">
            <h2 className="font-medium text-lg line-clamp-2 text-primary mb-2">
              {scrapedContent.title}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
              {scrapedContent.metadata.url && (
                <div className="flex items-center">
                  <Link className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-[200px]">{scrapedContent.metadata.url}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{scrapedContent.metadata.readingTime}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span>{scrapedContent.metadata.wordCount} words</span>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="original" className="text-xs">Original Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-0">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-primary">AI Summary</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(summary, "Summary")}
                className="h-8 px-2"
              >
                {copied && activeTab === "summary" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto bg-white p-3 rounded-md border border-purple-100">
              {summary}
            </div>
          </TabsContent>
          
          <TabsContent value="original" className="mt-0">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-primary">Original Content</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCopy(scrapedContent?.content || "", "Content")}
                className="h-8 px-2"
              >
                {copied && activeTab === "original" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto bg-white p-3 rounded-md border border-purple-100">
              {scrapedContent?.content || "No content available"}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SummaryResult;
