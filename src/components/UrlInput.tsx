
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const UrlInput = ({ onUrlSubmit, isLoading, disabled }: UrlInputProps) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = () => {
    if (url && url.startsWith("http")) {
      onUrlSubmit(url);
    } else {
      // Handle invalid URL
      setUrl("");
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-[#f3f0ff] shadow-md">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-primary mb-2">Summarize from URL</h3>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border-purple-100"
            disabled={isLoading || disabled}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || disabled || !url} 
            className="bg-primary hover:bg-primary/90"
          >
            <Link size={16} className="mr-2" />
            Go
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlInput;
