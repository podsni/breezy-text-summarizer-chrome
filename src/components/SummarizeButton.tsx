
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
      className="w-full bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 border border-purple-200/50 relative overflow-hidden group"
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]"></span>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span className="animate-pulse">Summarizing...</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          <span className="transition-all">Summarize This Page</span>
        </>
      )}
    </Button>
  );
};

export default SummarizeButton;
