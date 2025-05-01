import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  className?: string;
  children: React.ReactNode;
}

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  contentRef: { current: null }
});

export const Popover: React.FC<PopoverProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== undefined && open !== isOpen) {
      setIsOpen(open);
    }
  }, [open, isOpen]);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  const handleClickOutside = (event: MouseEvent) => {
    // Don't close if clicking inside the content or trigger
    if (
      (contentRef.current && contentRef.current.contains(event.target as Node)) ||
      (triggerRef.current && triggerRef.current.contains(event.target as Node))
    ) {
      return;
    }
    
    // Otherwise, if we're open, close the popover
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener only when popover is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <PopoverContext.Provider value={{ 
      open: isOpen, 
      setOpen: setIsOpen, 
      triggerRef,
      contentRef
    }}>
      {children}
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ 
  asChild, 
  children 
}) => {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  if (asChild) {
    return (
      <div 
        ref={triggerRef} 
        onClick={handleClick}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={triggerRef} 
      onClick={handleClick}
      className="inline-block cursor-pointer"
    >
      {children}
    </div>
  );
};

export const PopoverContent: React.FC<PopoverContentProps> = ({ 
  className, 
  children 
}) => {
  const { open, triggerRef, contentRef } = React.useContext(PopoverContext);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  // Position the content relative to the trigger
  const positionContent = () => {
    if (!open || !triggerRef.current || !contentRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const contentHeight = contentRect.height || 300; // Fallback height
    
    // Position horizontally - centered by default
    let left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    if (left < 10) left = 10; // Don't go off screen left
    if (left + contentRect.width > window.innerWidth - 10) {
      left = window.innerWidth - contentRect.width - 10; // Don't go off screen right
    }
    
    // Position vertically - below trigger if there's space
    let top;
    if (spaceBelow >= contentHeight || spaceBelow >= spaceAbove) {
      top = triggerRect.bottom + 5;
    } else {
      top = triggerRect.top - contentHeight - 5;
    }
    
    setPosition({ top, left });
    setIsPositioned(true);
  };

  // Update position when content opens or window resizes
  useEffect(() => {
    if (open) {
      // Initial positioning
      positionContent();
      
      // Add resize listener for responsive positioning
      window.addEventListener('resize', positionContent);
      
      // Small delay to ensure the content is rendered before final positioning
      const timeout = setTimeout(() => {
        positionContent();
      }, 50);
      
      return () => {
        window.removeEventListener('resize', positionContent);
        clearTimeout(timeout);
      };
    } else {
      setIsPositioned(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "fixed z-50 min-w-[200px] rounded-md border border-slate-700 bg-slate-800 p-4 shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        isPositioned ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}; 