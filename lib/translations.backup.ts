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
    am: "RPM",
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
  "Settings": {
    en: "Settings",
    am: "ቅንብሮች",
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
  "BATTERY SYSTEM": {
    en: "BATTERY SYSTEM",
    am: "የባትሪ ሥርዓት",
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
  // Additional capitalized terms for backup generator
  "INACTIVE": {
    en: "INACTIVE",
    am: "ንቁ ያልሆነ",
  },
  "OFFLINE": {
    en: "OFFLINE", 
    am: "ከመስመር ውጪ",
  },
  "POWER": {
    en: "POWER",
    am: "ኃይል",
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
  }
}

// Helper function to get translations
export function getTranslation(key: string, language: Language): string {
  const translation = solarSystemTranslations[key]
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`)
    return key
  }
  return translation[language]
} 