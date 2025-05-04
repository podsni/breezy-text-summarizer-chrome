
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const UrlInput = ({ onUrlSubmit, isLoading, disabled }: UrlInputProps) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateUrl = (input: string): boolean => {
    try {
      const parsedUrl = new URL(input);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    setError("");
    
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    
    if (!validateUrl(url)) {
      setError("Please enter a valid URL (including http:// or https://)");
      toast.error("Invalid URL format");
      return;
    }
    
    onUrlSubmit(url);
  };

  return (
    <Card className="bg-gradient-to-br from-white to-[#f3f0ff] shadow-md">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-primary mb-2">Summarize from URL</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className="flex-1 border-purple-100 focus-visible:ring-purple-400"
              disabled={isLoading || disabled}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading && !disabled) {
                  handleSubmit();
                }
              }}
            />
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || disabled || !url.trim()} 
              className="bg-primary hover:bg-primary/90 shadow-sm transition-all duration-300"
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  <Link size={16} className="mr-2" />
                  Go
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">
            Enter a complete URL including http:// or https://
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlInput;
