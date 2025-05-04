
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ApiKeyInputProps {
  onApiKeySaved: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySaved }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from chrome.storage on component mount
    chrome.storage?.sync?.get(["geminiApiKey"], (result) => {
      if (result.geminiApiKey) {
        setSavedKey(result.geminiApiKey);
        onApiKeySaved(result.geminiApiKey);
      }
    });
  }, [onApiKeySaved]);

  const handleSaveApiKey = () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }

    // Save to chrome.storage
    chrome.storage?.sync?.set({ geminiApiKey: apiKey }, () => {
      toast.success("API key saved");
      setSavedKey(apiKey);
      onApiKeySaved(apiKey);
      setApiKey("");
    });
  };

  const handleClearApiKey = () => {
    chrome.storage?.sync?.remove(["geminiApiKey"], () => {
      toast.info("API key removed");
      setSavedKey(null);
      onApiKeySaved("");
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white to-[#f3f0ff] shadow-md">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-primary mb-2">Gemini API Key</h3>
        <div className="flex items-center space-x-2">
          <Input
            type="password"
            placeholder="Enter Gemini API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 border-purple-100"
          />
          <Button onClick={handleSaveApiKey} className="bg-primary hover:bg-primary/90">Save</Button>
        </div>

        {savedKey && (
          <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
            <div className="flex items-center">
              <Key size={16} className="mr-2 text-primary" />
              <span className="text-xs">API key saved</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearApiKey}
              className="h-6 text-xs"
            >
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
