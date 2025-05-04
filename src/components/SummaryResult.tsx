
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface SummaryResultProps {
  summary: string;
}

const SummaryResult = ({ summary }: SummaryResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!summary) {
    return null;
  }

  return (
    <Card className="w-full shadow-md border-purple-100 bg-gradient-to-br from-white to-[#f9f8ff]">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-primary">Summary</h3>
          <div className="space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="h-8 px-2"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto bg-white p-3 rounded-md border border-purple-100">
          {summary}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryResult;
