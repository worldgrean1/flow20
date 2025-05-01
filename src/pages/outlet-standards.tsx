import { PowerOutlet, PowerOutletShowcase } from "@/components/ui/power-outlet-types";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function OutletStandardsPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to System</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">Square Power Outlet Standards (8.5×8.5cm)</h1>
        </div>
        
        <div className="grid gap-8">
          {/* Main showcase component */}
          <PowerOutletShowcase />
          
          {/* Individual outlet examples with different sizes */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 md:p-6">
            <h2 className="text-xl font-medium mb-6">Square Outlet Size Variants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Type C Sizes */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type C</h3>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[10rem] flex items-center justify-center">
                    <PowerOutlet type="C" size="sm" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Small (8.5×8.5cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[12rem] flex items-center justify-center">
                    <PowerOutlet type="C" size="md" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Medium (10×10cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[14rem] flex items-center justify-center">
                    <PowerOutlet type="C" size="lg" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Large (12×12cm)</span>
                </div>
              </div>
              
              {/* Type E Sizes */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type E</h3>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[10rem] flex items-center justify-center">
                    <PowerOutlet type="E" size="sm" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Small (8.5×8.5cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[12rem] flex items-center justify-center">
                    <PowerOutlet type="E" size="md" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Medium (10×10cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[14rem] flex items-center justify-center">
                    <PowerOutlet type="E" size="lg" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Large (12×12cm)</span>
                </div>
              </div>
              
              {/* Type F Sizes */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type F</h3>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[10rem] flex items-center justify-center">
                    <PowerOutlet type="F" size="sm" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Small (8.5×8.5cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[12rem] flex items-center justify-center">
                    <PowerOutlet type="F" size="md" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Medium (10×10cm)</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="h-[14rem] flex items-center justify-center">
                    <PowerOutlet type="F" size="lg" active={true} className="transform scale-50" />
                  </div>
                  <span className="text-xs text-slate-500">Large (12×12cm)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active vs Inactive examples */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 md:p-6">
            <h2 className="text-xl font-medium mb-6">Active vs Inactive States</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Type C Active/Inactive */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type C</h3>
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="C" active={true} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-green-500">Active</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="C" active={false} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-slate-500">Inactive</span>
                  </div>
                </div>
              </div>
              
              {/* Type E Active/Inactive */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type E</h3>
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="E" active={true} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-green-500">Active</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="E" active={false} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-slate-500">Inactive</span>
                  </div>
                </div>
              </div>
              
              {/* Type F Active/Inactive */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-300">Type F</h3>
                <div className="flex items-center justify-around">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="F" active={true} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-green-500">Active</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-[8rem] flex items-center justify-center">
                      <PowerOutlet type="F" active={false} className="transform scale-50" />
                    </div>
                    <span className="text-xs text-slate-500">Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 md:p-6">
            <h2 className="text-xl font-medium mb-4">Square Power Outlet Information</h2>
            
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                <strong className="text-slate-300">Type C:</strong> The Type C outlet (CEE 7/16) is a square 8.5×8.5cm unearthed socket with two round holes, common throughout Ethiopia and other parts of Africa.
              </p>
              
              <p>
                <strong className="text-slate-300">Type E:</strong> The Type E outlet is a square 8.5×8.5cm socket with two round pins and a round grounding pin. It's used in parts of Ethiopia and some former French colonies.
              </p>
              
              <p>
                <strong className="text-slate-300">Type F:</strong> Also known as the "Schuko" outlet, Type F is a square 8.5×8.5cm socket with two round pins and side grounding contacts. Common in many parts of Ethiopia.
              </p>
              
              <p>
                <strong className="text-slate-300">Type D:</strong> The Type D outlet is a square 8.5×8.5cm socket with three round pins arranged in a triangle. Used in India, Nepal, and some African countries.
              </p>
              
              <p>
                <strong className="text-slate-300">Type J:</strong> The Type J outlet is a square 8.5×8.5cm socket with three round pins in a triangular pattern. Primarily used in Switzerland.
              </p>
              
              <p>
                <strong className="text-slate-300">Type L:</strong> The Type L outlet is a square 8.5×8.5cm socket with three in-line pins. Used primarily in Italy and Chile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 