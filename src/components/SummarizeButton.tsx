
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";

interface SummarizeButtonProps {
  onSummarize: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const SummarizeButton = ({ onSummarize, isLoading, disabled }: SummarizeButtonProps) => {
  return (
    <Button 
      onClick={onSummarize} 
      disabled={isLoading || disabled} 
      className="w-full bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 border border-purple-200/50"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span className="animate-pulse">Summarizing...</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2" />
          Summarize This Page
        </>
      )}
    </Button>
  );
};

export default SummarizeButton;
