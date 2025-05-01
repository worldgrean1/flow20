import { useState, useEffect } from 'react';
import { cn } from "../../lib/utils";
import styles from './transformer-bushing.module.css';

interface TransformerBushingProps {
  position: "top" | "bottom"
  side: "left" | "center" | "right"
  isEnergized: boolean
  voltage: "high" | "low" | "medium" | number
  leakageCurrent?: number
  bushingStatus?: "good" | "degraded" | "critical"
  className?: string
}

export function TransformerBushing({
  position,
  side,
  isEnergized,
  voltage,
  leakageCurrent = 0,
  bushingStatus = "good",
  className
}: TransformerBushingProps) {
  // Prefixed with underscore to indicate intentionally unused state variables
  const [_coronaActive, setCoronaActive] = useState(false)
  const [_sparkActive, setSparkActive] = useState(false)

  // Helper function to get voltage category from numeric value
  const getVoltageCategory = (v: "high" | "low" | "medium" | number): "high" | "low" | "medium" => {
    if (typeof v === 'string') return v;
    
    // Categorize based on voltage level
    if (v >= 6600) return 'high';
    if (v >= 1000) return 'medium';
    return 'low';
  };

  // Get the voltage category for UI decisions
  const voltageCategory = getVoltageCategory(voltage);

  // Simulate corona discharge and sparking effects based on voltage and status
  useEffect(() => {
    if (!isEnergized) {
      setCoronaActive(false)
      setSparkActive(false)
      return
    }

    // Convert voltage to numeric value for calculations
    let voltageNumeric: number;
    
    if (typeof voltage === 'number') {
      voltageNumeric = voltage;
    } else {
      // Use default values based on category
      voltageNumeric = voltage === 'high' ? 11000 : voltage === 'medium' ? 6600 : 400;
    }

    const coronaInterval = setInterval(() => {
      const coronaProbability = (voltageNumeric / 11000) * (bushingStatus === "critical" ? 0.8 : bushingStatus === "degraded" ? 0.4 : 0.1)
      setCoronaActive(Math.random() < coronaProbability)
    }, 2000)

    const sparkInterval = setInterval(() => {
      const sparkProbability = (leakageCurrent / 100) * (bushingStatus === "critical" ? 0.6 : bushingStatus === "degraded" ? 0.3 : 0.05)
      setSparkActive(Math.random() < sparkProbability)
    }, 3000)

    return () => {
      clearInterval(coronaInterval)
      clearInterval(sparkInterval)
    }
  }, [isEnergized, voltage, leakageCurrent, bushingStatus])

  const generateCoronaRays = () => {
    return Array.from({ length: 8 }).map((_, i) => {
      const rotation = i * 45;
      return (
        <div
          key={i}
          className={styles.coronaRay}
          style={{
            left: '50%',
            top: '0',
            transform: `rotate(${rotation}deg) translateY(-100%)`,
            animation: `corona-ray 1s ease-in-out infinite ${i * 0.125}s`
          }}
        />
      );
    });
  };

  const generateLeakageParticles = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          styles.leakageParticle,
          "leakage-current-effect"
        )}
        style={{
          left: `${25 + i * 25}%`,
          height: `${Math.min(leakageCurrent * 0.5, 20)}px`,
          animationDelay: `${i * 0.2}s`
        }}
      />
    ));
  };

  const bushingClass = cn(
    styles.bushing,
    side === 'left' && styles.left,
    side === 'right' && styles.right,
    isEnergized && styles.energized,
    className
  );

  const statusClass = cn(
    bushingStatus === 'good' && styles.statusNormal,
    bushingStatus === 'degraded' && styles.statusWarning,
    bushingStatus === 'critical' && styles.statusFault
  );

  // Render insulator rings with improved visibility and spacing
  const renderInsulatorRings = () => {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => {
          const isAlternate = index % 2 === 0;
          const ringStyle = isAlternate ? styles.insulatorRing : styles.insulatorRingSmall;
          // Calculate position with proper spacing
          const topPosition = index * 20; // 20px spacing between rings
          
          return (
            <div 
              key={index} 
              className={ringStyle} 
              style={{ 
                top: topPosition, 
                opacity: isEnergized ? 1 : 0.8,
                left: isAlternate ? 0 : 4 // Center the smaller rings
              }}
            />
          );
        })}
      </>
    );
  };

  // Render bottom insulator rings with appropriate bottom positioning
  const renderBottomInsulatorRings = () => {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => {
          const isAlternate = index % 2 === 0;
          const ringStyle = isAlternate ? styles.insulatorRing : styles.insulatorRingSmall;
          // Calculate position with proper spacing from the bottom
          const bottomPosition = index * 20; // 20px spacing between rings
          
          return (
            <div 
              key={index} 
              className={ringStyle} 
              style={{ 
                bottom: bottomPosition, 
                top: 'auto',
                opacity: isEnergized ? 1 : 0.8,
                left: isAlternate ? 0 : 4 // Center the smaller rings
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={bushingClass}>
      {position === 'top' && (
        <>
          <div className={styles.connectingLine} />
          <div className={styles.insulatorRings}>
            {renderInsulatorRings()}
          </div>
          <div className={styles.terminal} />
          {isEnergized && (
            <div className={cn(styles.terminal, "terminal-energized")} />
          )}
        </>
      )}
      
      <div className={styles.bushingBody}>
        <div className={styles.bushingRibs}>
          <div className={styles.rib} />
          <div className={styles.rib} />
          <div className={styles.rib} />
          <div className={styles.rib} />
        </div>
        
        {isEnergized && voltageCategory === 'high' && (
          <div className={styles.coronaEffect}>
            {generateCoronaRays()}
          </div>
        )}
        
        {isEnergized && (
          <div className={styles.leakageCurrent}>
            {generateLeakageParticles()}
          </div>
        )}
        
        <div className={cn(styles.statusIndicator, statusClass)} />
      </div>
      
      {position === 'bottom' && (
        <>
          <div className={styles.bottomConnectingLine} />
          <div className={styles.bottomInsulatorRings}>
            {renderBottomInsulatorRings()}
          </div>
        </>
      )}
    </div>
  )
} 