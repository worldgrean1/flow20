import { useTheme } from "../../lib/theme-context";
import { Sun, Moon } from "lucide-react";
import { Badge } from "./badge";

export function ThemeInfo() {
  const { theme } = useTheme();
  
  return (
    <div className="bg-card border border-border rounded-md p-3 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-foreground">Theme Mode</h3>
        <Badge 
          variant="outline" 
          className={theme === 'light' 
            ? "bg-northrise-green/20 text-northrise-green-dark border-northrise-green" 
            : "bg-indigo-500/20 text-foreground border-indigo-500"
          }
        >
          {theme === 'light' ? 'NORTHRISE LIGHT' : 'DARK MODE'}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        {theme === 'light' ? (
          <>
            <Sun className="h-4 w-4 text-northrise-green" />
            <span className="text-xs text-muted-foreground">Using NorthRise light theme</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 text-indigo-400" />
            <span className="text-xs text-muted-foreground">Using dark theme</span>
          </>
        )}
      </div>
      
      {theme === 'light' && (
        <div className="mt-2 flex gap-2">
          <div className="w-4 h-4 rounded-full bg-northrise-green" title="Primary Green"></div>
          <div className="w-4 h-4 rounded-full bg-northrise-green-dark" title="Dark Green"></div>
          <div className="w-4 h-4 rounded-full bg-northrise-secondary-cream" title="Cream"></div>
          <div className="w-4 h-4 rounded-full bg-northrise-secondary-orange" title="Orange"></div>
        </div>
      )}
    </div>
  );
} 