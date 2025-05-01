import { cn } from "../../lib/utils";

type OutletType = 'C' | 'E' | 'F' | 'D' | 'J' | 'L' | 'I' | 'K' | 'B';

export interface PowerOutletProps {
  type: OutletType;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
}

/**
 * PowerOutlet Component
 * 
 * Displays different types of power outlets used in Ethiopia and internationally
 * Types C, E, and F are common in Ethiopia, while D, J, and L are shown as examples
 * of other international standards
 */
export function PowerOutlet({ type, size = 'md', active = false, className }: PowerOutletProps) {
  const sizeClasses = {
    sm: {
      outlet: "w-[8.5rem] h-[8.5rem]",
      pin: "w-4 h-4"
    },
    md: {
      outlet: "w-[10rem] h-[10rem]",
      pin: "w-5 h-5"
    },
    lg: {
      outlet: "w-[12rem] h-[12rem]",
      pin: "w-6 h-6"
    },
  };
  
  const outletClasses = cn(
    "relative inline-flex items-center justify-center",
    sizeClasses[size].outlet,
    active ? "shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "",
    className
  );
  
  // Base background color - gray when inactive
  const bgColor = active ? "bg-slate-400" : "bg-slate-500";
  
  const renderOutlet = () => {
    switch (type) {
      case "C":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin holes */}
                <div className="flex justify-center items-center h-full gap-4">
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "relative bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "relative bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">C-240V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "E":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin holes */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "relative bg-gray-600 rounded-full mb-4"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      "relative bg-gray-600 rounded-full",
                      sizeClasses[size].pin
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      width: `calc(${sizeClasses[size].pin.split(' ')[0]} * 1.3)`,
                      height: `calc(${sizeClasses[size].pin.split(' ')[1]} * 1.3)`,
                    }}
                  />
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">E-250V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "F":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin holes */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "relative bg-gray-600 rounded-full mb-4"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      "relative bg-gray-600 rounded-full overflow-hidden",
                      sizeClasses[size].pin
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      width: `calc(${sizeClasses[size].pin.split(' ')[0]} * 1.3)`,
                      height: `calc(${sizeClasses[size].pin.split(' ')[1]} * 1.3)`,
                    }}
                  >
                    {/* Ground clips inside the larger hole */}
                    <div className="absolute left-0 w-[25%] inset-y-0 bg-gray-500 opacity-80" style={{borderRight: "1px solid rgba(0,0,0,0.3)"}} />
                    <div className="absolute right-0 w-[25%] inset-y-0 bg-gray-500 opacity-80" style={{borderLeft: "1px solid rgba(0,0,0,0.3)"}} />
                  </div>
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">F-230V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "D":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin holes in triangular format */}
                <div className="absolute inset-0">
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute left-1/2 top-1/3 -translate-x-1/2 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute left-1/3 top-2/3 -translate-x-1/2 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute left-2/3 top-2/3 -translate-x-1/2 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">D-220V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "J":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Central inset for socket */}
                <div 
                  className="absolute inset-[15%] rounded-md"
                  style={{
                    backgroundColor: "#d8d8d8",
                    border: "1px solid rgba(120,120,120,0.3)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)"
                  }}
                >
                  {/* Pin holes */}
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute left-1/4 top-1/4 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute right-1/4 top-1/4 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                  <div
                    className={cn(
                      sizeClasses[size].pin,
                      "absolute left-1/2 top-3/4 -translate-x-1/2 bg-gray-600 rounded-full"
                    )}
                    style={{
                      boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                    }}
                  />
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">J-230V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "L":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Central inset for socket */}
                <div 
                  className="absolute inset-x-[15%] inset-y-[30%] rounded-md"
                  style={{
                    backgroundColor: "#d8d8d8",
                    border: "1px solid rgba(120,120,120,0.3)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)"
                  }}
                >
                  {/* Pin holes */}
                  <div className="h-full w-full flex items-center justify-between px-3">
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                  </div>
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">L-220V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "I":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin holes in V format */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-12 h-12">
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "absolute top-1/4 left-0 bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "absolute top-1/4 right-0 bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                    <div
                      className={cn(
                        sizeClasses[size].pin,
                        "absolute bottom-1/4 left-1/2 -translate-x-1/2 bg-gray-600 rounded-full"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                  </div>
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">I-240V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "K":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Central recessed area with pins */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="relative h-10 w-10 rounded-sm"
                    style={{
                      backgroundColor: "#d8d8d8",
                      border: "1px solid rgba(120,120,120,0.3)",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)"
                    }}
                  >
                    <div className="absolute h-full w-full flex items-center justify-center">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-sm bg-gray-600 rotate-45",
                          size === "sm" && "w-2 h-2",
                          size === "lg" && "w-4 h-4"
                        )}
                        style={{
                          boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">K-210V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      case "B":
        return (
          <div
            className={cn(
              sizeClasses[size].outlet,
              "rounded-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200",
              className
            )}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "50px 50px",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Outer frame */}
            <div 
              className="absolute inset-2 rounded-full"
              style={{
                border: "1px solid rgba(150,150,150,0.5)",
                backgroundColor: "#f0f0f0",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Inner plate */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  backgroundColor: "#e8e8e8",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {/* Screws */}
                <div 
                  className="absolute top-1 left-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>
                <div 
                  className="absolute top-1 right-4 w-2 h-2 rounded-full" 
                  style={{
                    background: "radial-gradient(circle, #b8b8b8 0%, #8a8a8a 100%)",
                    boxShadow: "inset 0 0 1px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-[2px] rounded-full bg-[#9a9a9a]" />
                </div>

                {/* Pin slots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-10 h-10">
                    <div
                      className={cn(
                        "absolute top-1/3 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-sm bg-gray-600",
                        size === "sm" && "w-3 h-1",
                        size === "lg" && "w-5 h-2"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                    <div
                      className={cn(
                        "absolute top-2/3 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-sm bg-gray-600",
                        size === "sm" && "w-3 h-1",
                        size === "lg" && "w-5 h-2"
                      )}
                      style={{
                        boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
                      }}
                    />
                  </div>
                </div>

                {/* Manufacturer model number */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[6px] text-gray-400 font-mono">B-120V</span>
                </div>
              </div>
            </div>

            {/* Surface glare/shine */}
            <div 
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
                transform: "scale(1.5)",
                transformOrigin: "top left"
              }}
            />
          </div>
        );
      default:
        return (
          <div className={cn(outletClasses, "bg-slate-300", "flex items-center justify-center rounded-md")}>
            <span className="text-xs text-slate-700">Unknown</span>
          </div>
        );
    }
  };
  
  return (
    <div className="relative">
      {renderOutlet()}
      {active && (
        <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)] animate-pulse"></div>
      )}
    </div>
  );
}

/**
 * PowerOutletShowcase Component
 * 
 * Displays a collection of power outlet types for demonstration purposes
 */
export function PowerOutletShowcase() {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg">
      <h3 className="text-lg font-medium text-slate-200 mb-4">Ethiopian & International Power Outlets</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Ethiopian Standards */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="C" 
              active={true} 
              size="sm" 
              className="transform scale-75"
            />
          </div>
          <span className="text-sm text-slate-400">Type C</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - Common in Ethiopia</span>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="E" 
              active={true} 
              size="sm"
              className="transform scale-75"
            />
          </div>
          <span className="text-sm text-slate-400">Type E</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - Used in Ethiopia</span>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="F" 
              active={true} 
              size="sm"
              className="transform scale-75" 
            />
          </div>
          <span className="text-sm text-slate-400">Type F</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - Found in Ethiopia</span>
        </div>
        
        {/* International Examples */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="D" 
              size="sm"
              className="transform scale-75"
            />
          </div>
          <span className="text-sm text-slate-400">Type D</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - India, Nepal</span>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="J" 
              size="sm"
              className="transform scale-75"
            />
          </div>
          <span className="text-sm text-slate-400">Type J</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - Switzerland</span>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center h-[10rem]">
            <PowerOutlet 
              type="L" 
              size="sm"
              className="transform scale-75"
            />
          </div>
          <span className="text-sm text-slate-400">Type L</span>
          <span className="text-xs text-slate-500">Square 8.5×8.5cm - Italy, Chile</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Ethiopia primarily uses Type C, E, and F outlets in square 8.5×8.5cm format, operating at 220-240V, 50Hz.
          International visitors may need power adapters when traveling to Ethiopia.
        </p>
      </div>
    </div>
  );
} 