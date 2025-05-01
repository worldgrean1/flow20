// Translation dictionary for English to Amharic
export type Language = "en" | "am"

export interface TranslationDictionary {
  [key: string]: {
    en: string
    am: string
  }
}

// Solar System Component Translations
export const solarSystemTranslations: TranslationDictionary = {
  // Core application name and branding
  "POWER-WAVE": {
    en: "POWER-WAVE",
    am: "ፓወር-ዌቭ",
  },
  "Battery System": {
    en: "Battery System",
    am: "የባትሪ ሥርዓት",
  },
  "BATTERY SYSTEM": {
    en: "BATTERY SYSTEM",
    am: "የባትሪ ሥርዓት",
  },
  "PowerVision Pro": {
    en: "PowerVision Pro",
    am: "ፓወርቪዥን ፕሮ",
  },
  "Advanced Energy Visualization": {
    en: "Advanced Energy Visualization",
    am: "የላቀ የኃይል ምስል",
  },
  "PowerVision Pro: A Real-World Green Energy Simulator": {
    en: "PowerVision Pro: A Real-World Green Energy Simulator",
    am: "ፓወርቪዥን ፕሮ፡ የእውነተኛ ዓለም አረንጓዴ ኃይል ሲምዩሌተር",
  },
  // Core UI elements
  "Dashboard": {
    en: "Dashboard",
    am: "ዳሽቦርድ",
  },
  "Settings": {
    en: "Settings",
    am: "ቅንብሮች",
  },
  "Analytics": {
    en: "Analytics",
    am: "ትንታኔዎች",
  },
  "Reports": {
    en: "Reports",
    am: "ሪፖርቶች",
  },
  "Notifications": {
    en: "Notifications",
    am: "ማሳወቂያዎች",
  },
  "Profile": {
    en: "Profile",
    am: "መገለጫ",
  },
  "Help": {
    en: "Help",
    am: "እገዛ",
  },
  "Logout": {
    en: "Logout",
    am: "ውጣ",
  },
  // Layout options
  "Choose Layout Style": {
    en: "Choose Layout Style",
    am: "የአቀማመጥ ዘይቤን ይምረጡ",
  },
  "Select a layout that best visualizes your energy network": {
    en: "Select a layout that best visualizes your energy network",
    am: "የኃይል አውታርዎን በተሻለ ሁኔታ የሚያሳይ አቀማመጥን ይምረጡ",
  },
  "Tree Layout": {
    en: "Tree Layout",
    am: "የዛፍ አቀማመጥ",
  },
  "Hierarchical organization": {
    en: "Hierarchical organization",
    am: "በደረጃ የተደራጀ",
  },
  "Force Layout": {
    en: "Force Layout",
    am: "የኃይል አቀማመጥ",
  },
  "Physics-based arrangement": {
    en: "Physics-based arrangement",
    am: "በፊዚክስ ላይ የተመሰረተ ዝግጅት",
  },
  "Layered Layout": {
    en: "Layered Layout",
    am: "ባለ ንብርብር አቀማመጥ",
  },
  "Clear system hierarchy": {
    en: "Clear system hierarchy",
    am: "ግልጽ የሥርዓት ደረጃ",
  },
  // Ensure "Environmental Sensor" is translated with high priority
  // Add this at the beginning of the dictionary or in a prominent place
  "Environmental Sensor": {
    en: "Environmental Sensor",
    am: "የአካባቢ ሴንሰር",
  },
  // General terms
  "Solar System": {
    en: "Solar System",
    am: "የፀሐይ ሥርዓት",
  },
  "Solar Panel": {
    en: "Solar Panel",
    am: "የፀሐይ ፓነል",
  },
  "Battery Bank": {
    en: "Battery Bank",
    am: "የባትሪ ባንክ",
  },
  "Charge Controller": {
    en: "Charge Controller",
    am: "የቻርጅ ተቆጣጣሪ",
  },
  Inverter: {
    en: "Inverter",
    am: "ኢንቨርተር",
  },
  "Inverter & Power Control": {
    en: "Inverter & Power Control",
    am: "ኢንቨርተር እና የኃይል ቁጥጥር",
  },
  "Distribution Panel": {
    en: "Distribution Panel",
    am: "የስርጭት ፓነል",
  },
  "System Status": {
    en: "System Status",
    am: "የሥርዓት ሁኔታ",
  },
  "Ethiopia Energy Network": {
    en: "Ethiopia Energy Network",
    am: "የኢትዮጵያ የኃይል አውታር",
  },
  "Ethiopia Solar Network": {
    en: "Ethiopia Solar Network",
    am: "የኢትዮጵያ የፀሐይ አውታር",
  },
  "Weather Conditions": {
    en: "Weather Conditions",
    am: "የአየር ሁኔታዎች",
  },
  "Safety Breaker": {
    en: "Safety Breaker",
    am: "የደህንነት ብሬከር",
  },
  "Backup Generator": {
    en: "Backup Generator",
    am: "ተጠባባቂ ጀነሬተር",
  },
  "I/O Controller": {
    en: "I/O Controller",
    am: "የግብዓት/ውጤት ተቆጣጣሪ",
  },
  "Smart Appliance": {
    en: "Smart Appliance",
    am: "ብልህ መሣሪያ",
  },

  // Weather conditions
  Sunny: {
    en: "Sunny",
    am: "ፀሐያማ",
  },
  Cloudy: {
    en: "Cloudy",
    am: "ደመናማ",
  },
  Rainy: {
    en: "Rainy",
    am: "ዝናባማ",
  },
  "Clear skies, optimal solar production": {
    en: "Clear skies, optimal solar production",
    am: "ጥሩ ሰማይ፣ ምርጥ የፀሐይ ምርት",
  },
  
  // Additional translations from codebase
  "Optimal Generation": {
    en: "Optimal Generation",
    am: "ምርጥ ማመንጨት",
  },
  "Reduced Output": {
    en: "Reduced Output",
    am: "የቀነሰ ውጤት",
  },
  "Minimal Generation": {
    en: "Minimal Generation",
    am: "አነስተኛ ማመንጨት",
  },
  "ONLINE": {
    en: "ONLINE",
    am: "በመስመር ላይ",
  },
  "OFFLINE": {
    en: "OFFLINE",
    am: "ከመስመር ውጪ",
  },
  "Weather": {
    en: "Weather",
    am: "አየር ንብረት",
  },
  "efficiency": {
    en: "efficiency",
    am: "ብቃት",
  },
  "Active": {
    en: "Active",
    am: "ንቁ",
  },
  "Warning": {
    en: "Warning",
    am: "ማስጠንቀቂያ",
  },
  "Offline": {
    en: "Offline",
    am: "ከመስመር ውጪ",
  },
  "Sunny weather": {
    en: "Sunny weather",
    am: "ፀሐያማ አየር",
  },
  "Cloudy weather": {
    en: "Cloudy weather",
    am: "ደመናማ አየር",
  },
  "Rainy weather": {
    en: "Rainy weather",
    am: "ዝናባማ አየር",
  },
  "Partial cloud cover, reduced solar efficiency": {
    en: "Partial cloud cover, reduced solar efficiency",
    am: "ከፊል የደመና ሽፋን፣ የቀነሰ የፀሐይ ብቃት",
  },
  "Rainy conditions, minimal solar production": {
    en: "Rainy conditions, minimal solar production",
    am: "ዝናባማ ሁኔታዎች፣ አነስተኛ የፀሐይ ምርት",
  },
  "Efficiency Simulator": {
    en: "Efficiency Simulator",
    am: "የብቃት ማስመሰያ",
  },
  "Multiplier": {
    en: "Multiplier",
    am: "አባዥ",
  },
  "Solar Status": {
    en: "Solar Status",
    am: "የፀሐይ ሁኔታ",
  },
  "Temperature": {
    en: "Temperature",
    am: "ሙቀት",
  },
  "Humidity": {
    en: "Humidity",
    am: "እርጥበት",
  },
  "Wind Speed": {
    en: "Wind Speed",
    am: "የነፋስ ፍጥነት",
  },
  "Solar Intensity": {
    en: "Solar Intensity",
    am: "የፀሐይ ጥንካሬ",
  },
  "Solar Production": {
    en: "Solar Production",
    am: "የፀሐይ ምርት",
  },
  "Battery Status": {
    en: "Battery Status",
    am: "የባትሪ ሁኔታ",
  },
  "Charging": {
    en: "Charging",
    am: "በመሙላት ላይ",
  },
  "Discharging": {
    en: "Discharging",
    am: "በመፍሰስ ላይ",
  },
  "Balanced": {
    en: "Balanced",
    am: "ተመጣጣኝ",
  },
  "Power Consumption": {
    en: "Power Consumption",
    am: "የኃይል ፍጆታ",
  },
  "Net Power Balance": {
    en: "Net Power Balance",
    am: "የተጣራ የኃይል ሚዛን",
  },
  "System Monitor": {
    en: "System Monitor",
    am: "የሥርዓት ክትትል",
  },
  "SMART-TECH": {
    en: "SMART-TECH",
    am: "ብልህ-ቴክ",
  },
  "Solar": {
    en: "Solar",
    am: "ፀሐይ",
  },
  "Usage": {
    en: "Usage",
    am: "አጠቃቀም",
  },
  "Battery": {
    en: "Battery",
    am: "ባትሪ",
  },
  "System Efficiency": {
    en: "System Efficiency",
    am: "የሥርዓት ብቃት",
  },
  "Energy Balance": {
    en: "Energy Balance",
    am: "የኃይል ሚዛን",
  },
  "Surplus": {
    en: "Surplus",
    am: "ትርፍ",
  },
  "Deficit": {
    en: "Deficit",
    am: "እጥረት",
  },
  "Panel Status": {
    en: "Panel Status",
    am: "የፓነል ሁኔታ",
  },
  "Sun Intensity": {
    en: "Sun Intensity",
    am: "የፀሐይ ጥንካሬ",
  },
  "Condition": {
    en: "Condition",
    am: "ሁኔታ",
  },
  "Cloud Cover": {
    en: "Cloud Cover",
    am: "የደመና ሽፋን",
  },
  "Precipitation": {
    en: "Precipitation",
    am: "ዝናብ",
  },
  "Stormy": {
    en: "Stormy",
    am: "አውሎ ነፋሳማ",
  },
  "Status": {
    en: "Status",
    am: "ሁኔታ",
  },
  "Inactive": {
    en: "Inactive",
    am: "ንቁ ያልሆነ",
  },
  "Output": {
    en: "Output",
    am: "ውጤት",
  },
  "Efficiency": {
    en: "Efficiency",
    am: "ብቃት",
  },
  "Solar Panel Status": {
    en: "Solar Panel Status",
    am: "የፀሐይ ፓነል ሁኔታ",
  },
  "Power Output": {
    en: "Power Output",
    am: "የኃይል ውጤት",
  },
  "Solar Angle": {
    en: "Solar Angle",
    am: "የፀሐይ ማዕዘን",
  },
  "Generator Status": {
    en: "Generator Status",
    am: "የጀነሬተር ሁኔታ",
  },
  "RPM": {
    en: "RPM",
    am: "አር.ፒ.ኤም",
  },
  "Fuel Consumption": {
    en: "Fuel Consumption",
    am: "የነዳጅ ፍጆታ",
  },
  "Fuel Level": {
    en: "Fuel Level",
    am: "የነዳጅ መጠን",
  },
  "Stop Generator": {
    en: "Stop Generator",
    am: "ጀነሬተሩን አቁም",
  },
  "Start Generator": {
    en: "Start Generator",
    am: "ጀነሬተሩን አስጀምር",
  },
  "Automatically manages system based on conditions": {
    en: "Automatically manages system based on conditions",
    am: "በሁኔታዎች ላይ በመመስረት ሥርዓቱን በራስ-ሰር ያስተዳድራል",
  },
  "Manual control of all system parameters": {
    en: "Manual control of all system parameters",
    am: "የሁሉም የሥርዓት ግቤቶችን በእጅ መቆጣጠር",
  },
  "Optimizes for energy efficiency": {
    en: "Optimizes for energy efficiency",
    am: "ለኃይል ቁጠባ ያመቻቻል",
  },
  "Maximum performance mode": {
    en: "Maximum performance mode",
    am: "ከፍተኛ አፈጻጸም ሁነታ",
  },
  "Advanced Settings": {
    en: "Advanced Settings",
    am: "የላቀ ቅንብሮች",
  },
  "System Mode": {
    en: "System Mode",
    am: "የሥርዓት ሁነታ",
  },
  "Auto": {
    en: "Auto",
    am: "ራስ-ሰር",
  },
  "Manual": {
    en: "Manual",
    am: "በእጅ",
  },
  "Eco": {
    en: "Eco",
    am: "ኢኮ",
  },
  "Boost": {
    en: "Boost",
    am: "ማጠናከሪያ",
  },
  "Remote Access": {
    en: "Remote Access",
    am: "የሩቅ መዳረሻ",
  },
  "Enable Remote Access": {
    en: "Enable Remote Access",
    am: "የሩቅ መዳረሻን አንቃ",
  },
  "Connected": {
    en: "Connected",
    am: "ተገናኝቷል",
  },
  "Connecting...": {
    en: "Connecting...",
    am: "በመገናኘት ላይ...",
  },
  // Additional status and error messages
  "Disconnected": {
    en: "Disconnected",
    am: "ተቋርጧል",
  },
  "Disconnected from Ethiopian Solar Network": {
    en: "Disconnected from Ethiopian Solar Network",
    am: "ከኢትዮጵያ የፀሐይ አውታር ተቋርጧል",
  },
  "Error": {
    en: "Error",
    am: "ስህተት",
  },
  "Connection Error": {
    en: "Connection Error",
    am: "የግንኙነት ስህተት",
  },
  "Success": {
    en: "Success",
    am: "ተሳክቷል",
  },
  "Failed": {
    en: "Failed",
    am: "አልተሳካም",
  },
  "Retry": {
    en: "Retry",
    am: "እንደገና ሞክር",
  },
  "Loading": {
    en: "Loading",
    am: "በመጫን ላይ",
  },
  "Save": {
    en: "Save",
    am: "አስቀምጥ",
  },
  "Cancel": {
    en: "Cancel",
    am: "ሰርዝ",
  },
  "Apply": {
    en: "Apply",
    am: "ተግብር",
  },
  
  // Additional translations for solar panel component
  "Panel Temp": {
    en: "Panel Temp",
    am: "የፓነል ሙቀት",
  },
  "Dust Level": {
    en: "Dust Level",
    am: "የአቧራ መጠን",
  },
  "Shading": {
    en: "Shading",
    am: "ጥላ",
  },
  "Cell Health": {
    en: "Cell Health",
    am: "የሴል ጤንነት",
  },
  "Connection": {
    en: "Connection",
    am: "ግንኙነት",
  },
  "Reverse Current": {
    en: "Reverse Current",
    am: "የተቃራኒ ዝርያ",
  },
  "Overvoltage": {
    en: "Overvoltage",
    am: "ከፍተኛ ቮልቴጅ",
  },
  "Ground Fault": {
    en: "Ground Fault",
    am: "የመሬት ብልሽት",
  },
  "Surge": {
    en: "Surge",
    am: "የኃይል መጀመር",
  },
  "String Fuse": {
    en: "String Fuse",
    am: "የስትሪንግ ፊውዝ",
  },
  "HEALTH METRICS": {
    en: "HEALTH METRICS",
    am: "የጤንነት መለኪያዎች",
  },
  "MAINTENANCE INFO": {
    en: "MAINTENANCE INFO",
    am: "የጥገና መረጃ",
  },
  "PROTECTION FEATURES": {
    en: "PROTECTION FEATURES",
    am: "የመከላከያ ባህሪያት",
  },
  "Hotspot": {
    en: "Hotspot",
    am: "ሞቃት ቦታ",
  },
  "Degradation": {
    en: "Degradation",
    am: "መቀነስ",
  },
  "Shading Impact": {
    en: "Shading Impact",
    am: "የጥላ ተጽእኖ",
  },
  "Warranty Status": {
    en: "Warranty Status",
    am: "የዋስትና ሁኔታ",
  },
  "Warranty Expiry": {
    en: "Warranty Expiry",
    am: "የዋስትና ጊዜ ማብቂያ",
  },
  "Last Cleaning": {
    en: "Last Cleaning",
    am: "የመጨረሻ ማጽዳት",
  },
  "Cleaning Required": {
    en: "Cleaning Required",
    am: "ማጽዳት ያስፈልጋል",
  },
  "None": {
    en: "None",
    am: "ምንም",
  },
  "normal": {
    en: "normal",
    am: "መደበኛ",
  },
  
  // New missing translations from battery node
  "Battery Type": {
    en: "Battery Type",
    am: "የባትሪ ዓይነት",
  },
  "Unknown": {
    en: "Unknown",
    am: "ያልታወቀ",
  },
  "Battery 1": {
    en: "Battery 1",
    am: "ባትሪ 1",
  },
  "Battery 2": {
    en: "Battery 2",
    am: "ባትሪ 2",
  },
  "Cycles": {
    en: "Cycles",
    am: "ዑደቶች",
  },
  "Cell Balancing": {
    en: "Cell Balancing",
    am: "የሴል ማመጣጠን",
  },
  "Estimated Runtime": {
    en: "Estimated Runtime",
    am: "የተገመተ የሥራ ጊዜ",
  },
  "Low Battery Warning": {
    en: "Low Battery Warning",
    am: "የባትሪ ዝቅተኛ ማስጠንቀቂያ",
  },
  "Critical Level": {
    en: "Critical Level",
    am: "አደገኛ ደረጃ",
  },
  "Charge Level": {
    en: "Charge Level",
    am: "የቻርጅ ደረጃ",
  },
  "State of Charge": {
    en: "State of Charge",
    am: "የቻርጅ ሁኔታ",
  },
  "Low": {
    en: "Low",
    am: "ዝቅተኛ",
  },
  "Medium": {
    en: "Medium",
    am: "መካከለኛ",
  },
  "High": {
    en: "High",
    am: "ከፍተኛ",
  },
  "Critical": {
    en: "Critical",
    am: "አደገኛ",
  },
  "Connection Type": {
    en: "Connection Type",
    am: "የግንኙነት ዓይነት",
  },
  "Parallel Connection": {
    en: "Parallel Connection",
    am: "ጎን ለጎን ግንኙነት",
  },
  
  // Missing distribution panel translations
  "TOTAL CONSUMPTION": {
    en: "TOTAL CONSUMPTION",
    am: "ጠቅላላ ፍጆታ",
  },
  "CONNECTED DEVICES": {
    en: "CONNECTED DEVICES",
    am: "የተገናኙ መሣሪያዎች",
  },
  "GRID CONNECTION": {
    en: "GRID CONNECTION",
    am: "የኤሌክትሪክ አውታር ግንኙነት",
  },
  "Lighting": {
    en: "Lighting",
    am: "ብርሃን",
  },
  "Refrigeration": {
    en: "Refrigeration",
    am: "ማቀዝቀዣ",
  },
  "HVAC": {
    en: "HVAC",
    am: "የአየር ማቀዝቀዣ",
  },
  "Computing": {
    en: "Computing",
    am: "ኮምፒዩቲንግ",
  },
  "Entertainment": {
    en: "Entertainment",
    am: "መዝናኛ",
  },
  "Other": {
    en: "Other",
    am: "ሌላ",
  },
  "Main Grid": {
    en: "Main Grid",
    am: "ዋና የኤሌክትሪክ አውታር",
  },
  "Battery Level": {
    en: "Battery Level",
    am: "የባትሪ ደረጃ",
  },
  "Switch to Grid": {
    en: "Switch to Grid",
    am: "ወደ አውታር ቀይር",
  },
  "Switch to Battery": {
    en: "Switch to Battery",
    am: "ወደ ባትሪ ቀይር",
  },
  "Standby": {
    en: "Standby",
    am: "ተጠባባቂ",
  },
  "Power Supply": {
    en: "Power Supply",
    am: "የኃይል አቅርቦት",
  },
  "Circuit Status": {
    en: "Circuit Status",
    am: "የሰርኪት ሁኔታ",
  },
  "Load Balancing": {
    en: "Load Balancing",
    am: "የጫና ማመጣጠን",
  },
  "Energy Usage": {
    en: "Energy Usage",
    am: "የኃይል አጠቃቀም",
  },
  "Current": {
    en: "Current",
    am: "ዝርያ",
  },
  
  // Missing translations for Charge Controller component
  "Charging Mode": {
    en: "Charging Mode",
    am: "የቻርጅ ሁኔታ",
  },
  "Bulk": {
    en: "Bulk",
    am: "ጥቅል",
  },
  "Absorption": {
    en: "Absorption",
    am: "መጥመቅ",
  },
  "Float": {
    en: "Float",
    am: "ማንሳፈፍ",
  },
  "Battery Backup Mode": {
    en: "Battery Backup Mode",
    am: "የባትሪ ተጠባባቂ ሁነታ",
  },
  "Solar panels are the primary power source": {
    en: "Solar panels are the primary power source",
    am: "የፀሐይ ፓነሎች ዋነኛ የኃይል ምንጭ ናቸው",
  },
  "24V DC": {
    en: "24V DC",
    am: "24ቮ ዲሲ",
  },
  "Battery is providing backup power to the system": {
    en: "Battery is providing backup power to the system",
    am: "ባትሪ ለስርዓቱ ተጠባባቂ ኃይል እያቀረበ ነው",
  },
  
  // Missing Distribution Panel translations
  "System Load": {
    en: "System Load",
    am: "የሥርዓት ጫና",
  },
  "CIRCUIT BREAKERS": {
    en: "CIRCUIT BREAKERS",
    am: "የኤሌክትሪክ ዑደት መቋረጫዎች",
  },
  "POWER ON": {
    en: "POWER ON",
    am: "ኃይል በርቷል",
  },
  "POWER OFF": {
    en: "POWER OFF",
    am: "ኃይል ጠፍቷል",
  },
  "Power Grid": {
    en: "Power Grid",
    am: "የኃይል መስመር",
  },
  "Main Load": {
    en: "Main Load",
    am: "ዋና ጫና",
  },
  "Backup Load": {
    en: "Backup Load",
    am: "ተጠባባቂ ጫና",
  },
  "Ethiopian Grid": {
    en: "Ethiopian Grid",
    am: "የኢትዮጵያ መስመር",
  },
  "Connected to Ethiopian Solar Network": {
    en: "Connected to Ethiopian Solar Network",
    am: "ከኢትዮጵያ የፀሐይ አውታር ጋር ተገናኝቷል",
  },
  "ESN": {
    en: "ESN",
    am: "ኢ.ፀ.አ"
  },
  
  // Backup Generator Translations
  "DG-1000": {
    en: "DG-1000",
    am: "ዲጂ-1000",
  },
  "Runtime": {
    en: "Runtime",
    am: "የሥራ ጊዜ",
  },
  "Running": {
    en: "Running",
    am: "በሥራ ላይ",
  },
  "Engine": {
    en: "Engine",
    am: "ሞተር",
  },
  "ENGINE BLOCK": {
    en: "ENGINE BLOCK",
    am: "የሞተር ብሎክ",
  },
  "Oil": {
    en: "Oil",
    am: "ዘይት",
  },
  "Total": {
    en: "Total",
    am: "ጠቅላላ",
  },
  "Engine Power": {
    en: "Engine Power",
    am: "የሞተር ኃይል",
  },
  "PSI": {
    en: "PSI",
    am: "ፒኤስአይ",
  },
  "Generator Status Panel": {
    en: "Generator Status Panel",
    am: "የጀነሬተር ሁኔታ ፓነል",
  },
  "OPERATIONAL": {
    en: "OPERATIONAL",
    am: "በሥራ ላይ",
  },
  "STANDBY": {
    en: "STANDBY",
    am: "ተጠባባቂ",
  },
  "Load Status": {
    en: "Load Status",
    am: "የጫና ሁኔታ",
  },
  "Capacity": {
    en: "Capacity",
    am: "አቅም",
  },
  "Primary Circuit": {
    en: "Primary Circuit",
    am: "ዋና ሰርኪት",
  },
  "Backup Circuit": {
    en: "Backup Circuit",
    am: "ተጠባባቂ ሰርኪት",
  },
  "Diagnostic Indicators": {
    en: "Diagnostic Indicators",
    am: "የምርመራ አመልካቾች",
  },
  "TEMP": {
    en: "TEMP",
    am: "ሙቀት",
  },
  "OIL": {
    en: "OIL",
    am: "ዘይት",
  },
  "FUEL": {
    en: "FUEL",
    am: "ነዳጅ",
  },
  "ACTIVE": {
    en: "ACTIVE",
    am: "ንቁ",
  },
  "Data": {
    en: "Data",
    am: "ውሂብ",
  },
  // Environmental Sensor missing translations
  "Weather Impact": {
    en: "Weather Impact",
    am: "የአየር ንብረት ተጽዕኖ",
  },
  "Solar Efficiency": {
    en: "Solar Efficiency",
    am: "የፀሐይ ብቃት",
  },
  "Optimal Conditions": {
    en: "Optimal Conditions",
    am: "ምርጥ ሁኔታዎች",
  },
  "Yes": {
    en: "Yes",
    am: "አዎ",
  },
  "No": {
    en: "No",
    am: "አይ",
  },
  // System Status component translations
  "System Secure": {
    en: "System Secure",
    am: "ሥርዓት ደህንነቱ የተጠበቀ ነው",
  },
  "SAFE-GUARD": {
    en: "SAFE-GUARD",
    am: "ደህንነት-ጠባቂ",
  },
  "ENGINE_1": {
    en: "ENGINE 1",
    am: "ሞተር 1",
  }, 
  "ENGINE_2": {
    en: "ENGINE 2",
    am: "ሞተር 2",
  },
  // Additional capitalized terms for backup generator
  "INACTIVE": {
    en: "INACTIVE",
    am: "ንቁ ያልሆነ",
  },
  "OFFLINE_STATUS": {
    en: "OFFLINE", 
    am: "ከመስመር ውጪ",
  },
  "TEMP_INDICATOR": {
    en: "TEMP",
    am: "ሙቀት",
  },
  "OIL_INDICATOR": {
    en: "OIL",
    am: "ዘይት",
  },
  "FUEL_INDICATOR": {
    en: "FUEL",
    am: "ነዳጅ",
  },
  "POWER": {
    en: "POWER",
    am: "ኃይል",
  },
  "Power": {
    en: "Power",
    am: "ኃይል",
  },
  "Starting": {
    en: "Starting",
    am: "በመጀመር ላይ",
  },
  "Stopping": {
    en: "Stopping",
    am: "በማቆም ላይ",
  },
  // Generator sound control
  "Mute generator sound": {
    en: "Mute generator sound",
    am: "የጀነሬተር ድምፅ ማጥፋት",
  },
  "Unmute generator sound": {
    en: "Unmute generator sound",
    am: "የጀነሬተር ድምፅ ማብራት",
  },
  "Sound & Animation": {
    en: "Sound & Animation",
    am: "ድምፅ እና ተንቀሳቃሽ ምስል",
  },
  "Engine Sound": {
    en: "Engine Sound",
    am: "የሞተር ድምፅ",
  },
  
  // Transformer Sound-Related Strings
  "Transformer Hum": {
    en: "Transformer Hum",
    am: "የትራንስፎርመር ድምጽ",
  },
  "Oil Bubbles": {
    en: "Oil Bubbles",
    am: "የዘይት አረፋዎች",
  },
  "Oil Flow": {
    en: "Oil Flow",
    am: "የዘይት ፍሰት",
  },
  "Discharge": {
    en: "Discharge",
    am: "የኤሌክትሪክ ፍሰት",
  },
  
  // Police Beacon Node Strings
  "Mute siren": {
    en: "Mute siren",
    am: "የሳይረን ድምፅ ማጥፋት",
  },
  "Unmute siren": {
    en: "Unmute siren",
    am: "የሳይረን ድምፅ ማብራት",
  },
  
  // Sound Visualization Related
  "Sound Visualization": {
    en: "Sound Visualization",
    am: "የድምፅ ምስል",
  },
  "Volume": {
    en: "Volume",
    am: "ድምፅ መጠን",
  },
  
  // Sound Control Elements
  "Sound Controls": {
    en: "Sound Controls",
    am: "የድምፅ መቆጣጠሪያዎች",
  },
  "Enable Sound": {
    en: "Enable Sound",
    am: "ድምፅ አንቃ",
  },
  "Disable Sound": {
    en: "Disable Sound",
    am: "ድምፅ አሰናክል",
  },
  "Volume Level": {
    en: "Volume Level",
    am: "የድምፅ መጠን",
  },
  
  // Additional Sound-Related Terms
  "Play": {
    en: "Play",
    am: "አጫውት",
  },
  "Pause": {
    en: "Pause",
    am: "አቁም",
  },
  "Audio": {
    en: "Audio",
    am: "ድምፅ",
  },
  "Mute": {
    en: "Mute",
    am: "ድምፅ አጥፋ",
  },
  "Unmute": {
    en: "Unmute",
    am: "ድምፅ አብራ",
  },
  "Sound Effects": {
    en: "Sound Effects",
    am: "የድምፅ ተጽዕኖዎች",
  },
  "Background Sounds": {
    en: "Background Sounds",
    am: "የጀርባ ድምፆች",
  },
  "Ambient Sound": {
    en: "Ambient Sound",
    am: "የአካባቢ ድምፅ",
  },
  "Mechanical Sound": {
    en: "Mechanical Sound",
    am: "የመሣሪያ ድምፅ",
  },
  "Electrical Sound": {
    en: "Electrical Sound",
    am: "የኤሌክትሪክ ድምፅ",
  },
  
  // Transformer Control Panel - Main sections
  "TransformerControl_Title": {
    en: "Transformer Control",
    am: "የትራንስፎርመር መቆጣጠሪያ",
  },
  "TransformerControl_PowerControl": {
    en: "Power Control",
    am: "የኃይል መቆጣጠሪያ",
  },
  "TransformerControl_MainPower": {
    en: "Main transformer power",
    am: "ዋና የትራንስፎርመር ኃይል",
  },
  "TransformerControl_OperatingParameters": {
    en: "Operating Parameters",
    am: "የአሰራር መለኪያዎች",
  },
  "TransformerControl_AdvancedMetrics": {
    en: "Advanced Metrics",
    am: "የላቀ መለኪያዎች",
  },
  "TransformerControl_HealthStatus": {
    en: "Health Status",
    am: "የጤንነት ሁኔታ",
  },
  
  // Transformer Control - Parameter names
  "TransformerControl_OilTemperature": {
    en: "Oil Temperature",
    am: "የዘይት ሙቀት",
  },
  "TransformerControl_WindingTemp": {
    en: "Winding Temp",
    am: "የሽቦ ማሸብ ሙቀት",
  },
  "TransformerControl_Load": {
    en: "Load",
    am: "ጫና",
  },
  "TransformerControl_TapPosition": {
    en: "Tap Position",
    am: "የታፕ ቦታ",
  },
  "TransformerControl_InputVoltage": {
    en: "Input Voltage",
    am: "የገቢ ቮልቴጅ",
  },
  "TransformerControl_OutputVoltage": {
    en: "Output Voltage",
    am: "የውጤት ቮልቴጅ",
  },
  
  // Advanced metrics
  "TransformerControl_Efficiency": {
    en: "Efficiency",
    am: "ብቃት",
  },
  "TransformerControl_Harmonics": {
    en: "Harmonics",
    am: "ሀርሞኒክስ",
  },
  "TransformerControl_PhaseBalance": {
    en: "Phase Balance",
    am: "የፋዝ ሚዛን",
  },
  
  // Health status indicators
  "TransformerControl_OverallHealth": {
    en: "Overall Health",
    am: "አጠቃላይ ጤንነት",
  },
  "TransformerControl_HotspotTemp": {
    en: "Hotspot Temp",
    am: "የትኩስ ቦታ ሙቀት",
  },
  "TransformerControl_OilAcidity": {
    en: "Oil Acidity",
    am: "የዘይት ኮምጣጣነት",
  },
  "TransformerControl_Insulation": {
    en: "Insulation",
    am: "ማለያ",
  },
  "TransformerControl_MoistureContent": {
    en: "Moisture Content",
    am: "የእርጥበት መጠን",
  },
  "TransformerControl_CoolingSystem": {
    en: "Cooling System",
    am: "የማቀዝቀዣ ሥርዓት",
  },
  "TransformerControl_DielectricStrength": {
    en: "Dielectric Strength",
    am: "ዲኤሌክትሪክ ጥንካሬ",
  },
  
  // Warning indicators
  "TransformerControl_HotspotWarning": {
    en: "Hotspot Warning",
    am: "የሙቀት ቦታ ማስጠንቀቂያ",
  },
  "TransformerControl_HighHarmonics": {
    en: "High Harmonics",
    am: "ከፍተኛ ሀርሞኒክስ",
  },
  "TransformerControl_HighTemperature": {
    en: "High Temperature",
    am: "ከፍተኛ ሙቀት",
  },
  "TransformerControl_WaterWarning": {
    en: "Water Warning",
    am: "የውሃ ማስጠንቀቂያ",
  },
  "TransformerControl_PartialDischarge": {
    en: "Partial Discharge",
    am: "ከፊል የኤሌክትሪክ ፍሰት",
  },
  "TransformerControl_Pressure": {
    en: "Pressure",
    am: "ግፊት",
  },
  
  // Units
  "TransformerControl_kV": {
    en: "kV",
    am: "ኪሎቮልት",
  },
  "TransformerControl_V": {
    en: "V",
    am: "ቮልት",
  },
  "TransformerControl_C": {
    en: "°C",
    am: "°ሴ",
  },
  "TransformerControl_Percent": {
    en: "%",
    am: "%",
  },
  "TransformerControl_PPM": {
    en: "ppm",
    am: "ፒፒኤም",
  },
  "TransformerControl_kPa": {
    en: "kPa",
    am: "ኪሎፓስካል",
  },
  
  // Sound and animation related keys
  "TransformerControl_SoundAndAnimation": {
    en: "Sound & Animation",
    am: "ድምፅ እና ተንቀሳቃሽ ምስል",
  },
  "TransformerControl_TransformerHum": {
    en: "Transformer Hum",
    am: "የትራንስፎርመር ድምጽ",
  },
  "TransformerControl_OilBubbles": {
    en: "Oil Bubbles",
    am: "የዘይት አረፋዎች",
  },
  "TransformerControl_OilFlow": {
    en: "Oil Flow",
    am: "የዘይት ፍሰት",
  },
  "TransformerControl_Discharge": {
    en: "Discharge",
    am: "የኃይል ፍሰት",
  },
  "TransformerControl_OilLevel": {
    en: "Oil Level",
    am: "የዘይት መጠን",
  },
  
  // Smart Outlet (Wall Outlet) translations
  "SmartOutlet_Title": {
    en: "Smart Outlet",
    am: "ብልህ መውጫ",
  },
  "SmartOutlet_Active": {
    en: "ACTIVE",
    am: "ንቁ",
  },
  "SmartOutlet_Inactive": {
    en: "INACTIVE",
    am: "ንቁ ያልሆነ",
  },
  "SmartOutlet_OutletType": {
    en: "Outlet Type",
    am: "የመውጫ አይነት",
  },
  "SmartOutlet_PowerStatus": {
    en: "Power Status",
    am: "የኃይል ሁኔታ",
  },
  "SmartOutlet_Powered": {
    en: "Powered",
    am: "ኃይል አለው",
  },
  "SmartOutlet_NoPower": {
    en: "No Power",
    am: "ኃይል የለውም",
  },
  "SmartOutlet_ConnectedDevice": {
    en: "Connected Device",
    am: "የተገናኘ መሣሪያ",
  },
  "SmartOutlet_ChangeOutletType": {
    en: "Change Outlet Type",
    am: "የመውጫ አይነት ለውጥ",
  },
  "SmartOutlet_OutletPriority": {
    en: "Outlet Priority",
    am: "የመውጫ ቅድሚያ",
  },
  "SmartOutlet_Critical": {
    en: "Critical",
    am: "አስፈላጊ",
  },
  "SmartOutlet_Standard": {
    en: "Standard",
    am: "መደበኛ",
  },
  "SmartOutlet_Optional": {
    en: "Optional",
    am: "አማራጭ",
  },
  "SmartOutlet_ManualControl": {
    en: "Manual Control",
    am: "በእጅ መቆጣጠሪያ",
  },
  "SmartOutlet_PowerOverloadWarning": {
    en: "Power Overload Warning",
    am: "የኃይል ብዛት ማስጠንቀቂያ",
  },
  
  // Smart Light Switch translations
  "LightSwitch_Title": {
    en: "Smart Light Switch",
    am: "ብልህ የመብራት ማብሪያ/ማጥፊያ",
  },
  "LightSwitch_On": {
    en: "ON",
    am: "በርቷል",
  },
  "LightSwitch_Off": {
    en: "OFF",
    am: "ጠፍቷል",
  },
  "LightSwitch_Status": {
    en: "Light Status",
    am: "የመብራት ሁኔታ",
  },
  "LightSwitch_Light": {
    en: "light",
    am: "መብራት",
  },
  "LightSwitch_Lights": {
    en: "lights",
    am: "መብራቶች",
  },
  "LightSwitch_Connected": {
    en: "connected",
    am: "ተገናኝቷል",
  },
  "LightSwitch_Brightness": {
    en: "Brightness",
    am: "ብርሃን",
  },
  "LightSwitch_PowerSaving": {
    en: "Power Saving",
    am: "ኃይል ቆጣቢ",
  },
  "LightSwitch_MotionDetection": {
    en: "Motion Detection",
    am: "የእንቅስቃሴ ማወቂያ",
  },
  
  // Smart Thermostat translations
  "Thermostat_Title": {
    en: "Smart Thermostat",
    am: "ብልህ የሙቀት መቆጣጠሪያ",
  },
  "Thermostat_Off": {
    en: "Off",
    am: "ጠፍቷል",
  },
  "Thermostat_Heating": {
    en: "Heating",
    am: "በማሞቅ ላይ",
  },
  "Thermostat_Cooling": {
    en: "Cooling",
    am: "በማቀዝቀዝ ላይ",
  },
  "Thermostat_Standby": {
    en: "Standby",
    am: "ተጠባባቂ",
  },
  "Thermostat_Maintaining": {
    en: "Maintaining",
    am: "በመጠበቅ ላይ",
  },
  "Thermostat_Current": {
    en: "Current",
    am: "የአሁን",
  },
  "Thermostat_Target": {
    en: "Target",
    am: "ዒላማ",
  },
  "Thermostat_Mode": {
    en: "Mode",
    am: "ሁኔታ",
  },
  "Thermostat_Heat": {
    en: "Heat",
    am: "ሙቀት",
  },
  "Thermostat_Cool": {
    en: "Cool",
    am: "ቅዝቃዜ",
  },
  "Thermostat_Auto": {
    en: "Auto",
    am: "ራስ-ሰር",
  },
  "Thermostat_EnergyUsage": {
    en: "Energy Usage",
    am: "የኃይል አጠቃቀም",
  },
  "Thermostat_EcoMode": {
    en: "ECO Mode",
    am: "ኢኮ ሁኔታ",
  },
  "Thermostat_Schedule": {
    en: "Schedule",
    am: "መርሐግብር",
  },
  "Thermostat_Power": {
    en: "Thermostat Power",
    am: "የሙቀት መቆጣጠሪያ ኃይል",
  },
  "Thermostat_EssentialClimateControl": {
    en: "Essential Climate Control",
    am: "አስፈላጊ የአየር ሁኔታ መቆጣጠሪያ",
  },
  // Node specific translations
  "Transformer": {
    en: "Transformer",
    am: "ትራንስፎርመር",
  },
  "Load": {
    en: "Load",
    am: "ጫና",
  },
  "Grid": {
    en: "Grid",
    am: "ግሪድ",
  },
  "Power Flow": {
    en: "Power Flow",
    am: "የኃይል ፍሰት",
  },
  // Common actions
  "Remove": {
    en: "Remove",
    am: "አስወግድ",
  },
  // Common messages
  "No data available": {
    en: "No data available",
    am: "ምንም መረጃ አልተገኘም",
  },
  "Please wait": {
    en: "Please wait",
    am: "እባክዎ ይጠብቁ",
  },
  // Layout Settings translations
  "Layout Settings": {
    en: "Layout Settings",
    am: "የቅርብ አቀማመጥ ቅንብሮች",
  },
  "Power Sources Position": {
    en: "Power Sources Position",
    am: "የኃይል ምንጮች አቀማመጥ",
  },
  "Adjust the horizontal position of power sources": {
    en: "Adjust the horizontal position of power sources",
    am: "የኃይል ምንጮችን አግድም አቀማመጥ ያስተካክሉ",
  },
  "Node Spacing": {
    en: "Node Spacing",
    am: "የኖድ ክፍተት",
  },
  "Adjust spacing between nodes": {
    en: "Adjust spacing between nodes",
    am: "በኖዶች መካከል ያለውን ክፍተት ያስተካክሉ",
  },
  "Layer Spacing": {
    en: "Layer Spacing",
    am: "የቅጥ ክፍተት",
  },
  "Adjust spacing between layers": {
    en: "Adjust spacing between layers",
    am: "በቅጦች መካከል ያለውን ክፍተት ያስተካክሉ",
  },
  "Layout Direction": {
    en: "Layout Direction",
    am: "የቅርብ አቀማመጥ አቅጣጫ",
  },
  "Left": {
    en: "Left",
    am: "ግራ",
  },
  "Right": {
    en: "Right",
    am: "ቀኝ",
  },
  "Up": {
    en: "Up",
    am: "ላይ",
  },
  "Down": {
    en: "Down",
    am: "ታች",
  },
  "Enable Partitioning": {
    en: "Enable Partitioning",
    am: "ክፍፍል አንቃ",
  },
  "Partition Spacing": {
    en: "Partition Spacing",
    am: "የክፍፍል ክፍተት",
  },
  "Adjust spacing between partitions": {
    en: "Adjust spacing between partitions",
    am: "በክፍፍሎች መካከል ያለውን ክፍተት ያስተካክሉ",
  },
  "Edge Routing": {
    en: "Edge Routing",
    am: "የጠርዝ መስመር",
  },
  "Orthogonal": {
    en: "Orthogonal",
    am: "ኦርቶጎናል",
  },
  "Polyline": {
    en: "Polyline",
    am: "ፖሊላይን",
  },
  "Splines": {
    en: "Splines",
    am: "ስፕላይንስ",
  },
  "Edge Spacing": {
    en: "Edge Spacing",
    am: "የጠርዝ ክፍተት",
  },
  "Adjust spacing between edges": {
    en: "Adjust spacing between edges",
    am: "በጠርዞች መካከል ያለውን ክፍተት ያስተካክሉ",
  },
  "Apply Settings": {
    en: "Apply Settings",
    am: "ቅንብሮችን ተግብር",
  },
}

// Merge all translations into a single dictionary
const allTranslations: TranslationDictionary = {
  ...solarSystemTranslations
};

// Enhanced translation function with better error handling and fallback
export function getTranslation(key: string, language: Language): string {
  const translation = allTranslations[key];
  
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  
  if (!translation[language]) {
    console.warn(`Translation missing for language ${language} in key: ${key}`);
    return translation.en || key; // Fallback to English if available
  }
  
  return translation[language];
} 