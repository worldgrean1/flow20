import { cn } from "../../lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-3 px-4 bg-transparent",
      className
    )}>
      <div className="flex items-center gap-4">
        <img 
          src="/etmap/Header-logo.PNG" 
          alt="Grean World Energy Technology PLC Logo" 
          className="h-16 w-auto object-contain drop-shadow-md"
        />
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-black dark:text-green-400 tracking-wide leading-tight drop-shadow-sm">
            GREAN WORLD ENERGY<br />
            TECHNOLOGY PLC
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center drop-shadow-sm">
            Renewable Energy Management System
          </p>
        </div>
      </div>
    </div>
  );
} 