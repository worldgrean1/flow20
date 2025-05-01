import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Edge,
  OnNodesChange,
  applyNodeChanges,
  EdgeTypes,
  useReactFlow,
  ReactFlowProvider,
  Node as RFNode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles/weather-animations.css';
import './styles/layout-animations.css';
import { 
  BackupGeneratorNode, 
  BatteryNode, 
  ChargeControllerNode,
  DistributionPanelNode,
  EnvironmentalSensorNode,
  InverterNode,
  IoControllerNode,
  SolarPanelNode,
  SystemMonitorNode,
  SystemStatusNode,
  WeatherControlsNode,
  ThreePhaseTransformerNode,
  LightSwitchNode,
  WallOutletNode,
  PhilipsLightBulbNode,
} from './components/flow';
import CustomEnergyEdge from './components/flow/custom-energy-edge';
// Import Ethiopia Map Node
import EthiopiaMapNode from './components/tech-innovation/solar-system/nodes/ethiopia-map-node';
// Import the translation hook
import { useTranslation } from '../hooks/use-translation';
// Import the layout utility functions
import { getLayoutedElements, layoutOptions } from './lib/elk-layout';
// Import layout selection card
import { LayoutSelectionCard } from './components/ui/layout-selection-card';
// Import Header component
import { Header } from './components/ui/header';
// Import cn utility
import { cn } from './lib/utils';
// Import ThemeToggle component
import { ThemeToggle } from './components/ui/theme-toggle';
// Import LanguageSwitch component
import { LanguageSwitch } from './components/ui/language-switch';
// Import BackgroundSelector component
import { BackgroundSelector } from './components/ui/background-selector';
import { useBackground } from './lib/background-context';
// Import initial flow data
import { initialNodes, initialEdges } from './data/initial-flow-data';
// Import LayoutSettings component
import { LayoutSettings } from './components/ui/layout-settings';
import { Settings } from "lucide-react"
import { Button } from './components/ui/button';
import { PowerVisionHeader } from './components/ui/powervision-header';

// Extend layoutOptions type to include 'custom'
type LayoutType = keyof typeof layoutOptions | 'custom';

// Register all node types
const nodeTypes: NodeTypes = {
  backupGenerator: BackupGeneratorNode,
  battery: BatteryNode,
  chargeController: ChargeControllerNode,
  distributionPanel: DistributionPanelNode,
  environmentalSensor: EnvironmentalSensorNode,
  inverter: InverterNode,
  ioController: IoControllerNode,
  solarPanel: SolarPanelNode,
  systemMonitor: SystemMonitorNode,
  systemStatus: SystemStatusNode,
  weatherControls: WeatherControlsNode,
  ethiopiaMap: EthiopiaMapNode,
  threePhaseTransformer: ThreePhaseTransformerNode,
  lightSwitch: LightSwitchNode,
  wallOutlet: WallOutletNode,
  philipsLightBulb: PhilipsLightBulbNode,
};

// Register edge types
const edgeTypes: EdgeTypes = {
  energyEdge: CustomEnergyEdge,
};

// Flow component that uses ReactFlow hooks
function Flow({ showLayoutSettings, setShowLayoutSettings }: { 
  showLayoutSettings: boolean; 
  setShowLayoutSettings: (show: boolean) => void;
}) {
  const [nodes, setNodes] = useState<RFNode[]>(initialNodes as RFNode[]);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isLayouting, setIsLayouting] = useState(false);
  const [currentLayoutType, setCurrentLayoutType] = useState<LayoutType | null>(null);
  const [showLayoutCard, setShowLayoutCard] = useState(true);
  const [customLayoutOptions, setCustomLayoutOptions] = useState<any>(null);
  const [manualDragMode, setManualDragMode] = useState(false);
  const { backgroundColor } = useBackground();
  const { t, language } = useTranslation();
  const { fitView, zoomTo, getZoom } = useReactFlow();
  
  // Load saved layout settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('layoutSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        console.log('Loading saved layout settings:', parsedSettings);
        setCustomLayoutOptions(parsedSettings);
        
        // Apply the saved layout type if available
        if (parsedSettings.layoutType) {
          setCurrentLayoutType(parsedSettings.layoutType);
          setManualDragMode(parsedSettings.manualDragMode || false);
          
          // If custom, load custom positions
          if (parsedSettings.layoutType === 'custom') {
            const saved = localStorage.getItem('customLayoutPositions');
            if (saved) {
              try {
                const positions = JSON.parse(saved);
                console.log('Loading custom layout positions:', positions);
                setNodes(prevNodes => {
                  const updatedNodes = prevNodes.map(node => {
                    const found = positions.find((n: any) => n.id === node.id);
                    return found ? { 
                      ...node, 
                      position: found.position,
                      style: { ...node.style, transition: 'all 0.5s ease-out' }
                    } : node;
                  });
                  // After updating nodes, fit view
                  setTimeout(() => {
                    fitView({ padding: 0.2, duration: 400 });
                  }, 100);
                  return updatedNodes;
                });
              } catch (error) {
                console.error('Error loading custom layout positions:', error);
              }
            } else {
              console.warn('No custom layout positions found in localStorage');
            }
          } else {
            // Apply the layout with a slight delay to ensure nodes are mounted
            setTimeout(() => {
              applyLayout(parsedSettings.layoutType, parsedSettings);
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error loading saved layout settings:', error);
      }
    } else {
      console.warn('No saved layout settings found in localStorage');
    }
  }, []);

  // Listen for manual drag mode and save custom layout events
  useEffect(() => {
    function handleSaveCustomLayout() {
      // Save current node positions as custom layout
      const customPositions = nodes.map(node => ({ 
        id: node.id, 
        position: node.position,
        type: node.type,
        data: node.data
      }));
      console.log('Saving custom layout positions:', customPositions);
      localStorage.setItem('customLayoutPositions', JSON.stringify(customPositions));
      
      const settingsToSave = {
        ...customLayoutOptions,
        layoutType: 'custom',
        manualDragMode: true
      };
      console.log('Saving layout settings:', settingsToSave);
      localStorage.setItem('layoutSettings', JSON.stringify(settingsToSave));
      
      // Verify the save was successful
      const savedPositions = localStorage.getItem('customLayoutPositions');
      const savedSettings = localStorage.getItem('layoutSettings');
      console.log('Verification - Saved positions:', savedPositions ? 'Found' : 'Not found');
      console.log('Verification - Saved settings:', savedSettings ? 'Found' : 'Not found');
      
      setCurrentLayoutType('custom');
      setManualDragMode(true);
    }
    window.addEventListener('saveCustomLayout', handleSaveCustomLayout);
    return () => window.removeEventListener('saveCustomLayout', handleSaveCustomLayout);
  }, [nodes, customLayoutOptions]);

  // Add a function to check saved layout
  const checkSavedLayout = useCallback(() => {
    const savedSettings = localStorage.getItem('layoutSettings');
    const savedPositions = localStorage.getItem('customLayoutPositions');
    
    console.log('=== Saved Layout Check ===');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        console.log('Layout Settings:', {
          layoutType: settings.layoutType,
          manualDragMode: settings.manualDragMode,
          hasCustomOptions: !!settings.customLayoutOptions
        });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    } else {
      console.log('No layout settings found');
    }
    
    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions);
        console.log('Custom Positions:', {
          numberOfNodes: positions.length,
          nodeIds: positions.map((p: any) => p.id)
        });
      } catch (error) {
        console.error('Error parsing saved positions:', error);
      }
    } else {
      console.log('No custom positions found');
    }
    console.log('========================');
  }, []);

  // Check saved layout on mount
  useEffect(() => {
    checkSavedLayout();
  }, [checkSavedLayout]);

  // Load saved custom layout if selected
  useEffect(() => {
    if (currentLayoutType === 'custom') {
      const saved = localStorage.getItem('customLayoutPositions');
      if (saved) {
        try {
          const positions = JSON.parse(saved);
          console.log('Loading custom layout positions:', positions);
          setNodes(prevNodes => {
            const updatedNodes = prevNodes.map(node => {
              const found = positions.find((n: any) => n.id === node.id);
              if (found) {
                return {
                  ...node,
                  position: found.position,
                  style: { ...node.style, transition: 'all 0.5s ease-out' }
                };
              }
              return node;
            });
            // After updating nodes, fit view
            setTimeout(() => {
              fitView({ padding: 0.2, duration: 400 });
            }, 100);
            return updatedNodes;
          });
        } catch (error) {
          console.error('Error loading custom layout positions:', error);
        }
      } else {
        console.warn('No custom layout positions found in localStorage');
      }
    }
  }, [currentLayoutType, fitView]);

  // Define applyLayout first
  const applyLayout = useCallback(async (layoutType: keyof typeof layoutOptions, customOptions?: any) => {
    if (isLayouting || nodes.length === 0) return;
    setIsLayouting(true);
    setCurrentLayoutType(layoutType);
    try {
      const options = customOptions || layoutOptions[layoutType];
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
        nodes,
        edges,
        options
      );
      setNodes(withCallbacks([...layoutedNodes].map(node => ({ 
        ...node, 
        style: { ...node.style, transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' } 
      }))));
      setEdges([...layoutedEdges]);
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 400 });
        setTimeout(() => {
          zoomTo(0.5, { duration: 500 });
        }, 500);
      }, 100);
      setTimeout(() => {
        setNodes(prevNodes => withCallbacks(prevNodes.map(node => ({
          ...node,
          style: { ...node.style, transition: undefined }
        }))));
      }, 1500);
    } catch (error) {
      console.error('Error applying layout:', error);
    } finally {
      setTimeout(() => {
        setIsLayouting(false);
      }, 1500);
    }
  }, [nodes, edges, isLayouting, fitView, zoomTo, getZoom]);

  // Pass manualDragMode to LayoutSettings and update when toggled
  const handleLayoutSettings = useCallback((settings: any) => {
    // Save the current layout type with the settings
    const settingsToSave = {
      ...settings,
      layoutType: currentLayoutType || 'powerSourcesColumn',
      manualDragMode,
    };
    localStorage.setItem('layoutSettings', JSON.stringify(settingsToSave));
    setCustomLayoutOptions(settings);
    setShowLayoutSettings(false);
    // Apply the new settings
    if (currentLayoutType === 'custom') {
      // Already handled by useEffect
      return;
    }
    applyLayout(currentLayoutType || 'powerSourcesColumn', settings);
  }, [currentLayoutType, applyLayout, setShowLayoutSettings, manualDragMode]);

  // Update translation function in all nodes when language changes
  useEffect(() => {
    setNodes(current =>
      current.map(node => ({
        ...node,
        data: {
          ...node.data,
          t, // Update with the current translation function
        },
      }))
    );
  }, [t, language]);

  // Close layout selection card
  const closeLayoutCard = useCallback(() => {
    setShowLayoutCard(false);
  }, []);

  // Handle transformer state changes
  const handleTransformerChange = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'transformer-1') {
          return {
            ...node,
            data: {
              ...node.data,
              transformerOn: value,
            },
          };
        }
        return node;
      });
    });

    // Update connected edges animation
    setEdges((eds) => {
      return eds.map((edge) => {
        if (edge.source === 'transformer-1') {
          return {
            ...edge,
            animated: value,
          };
        }
        return edge;
      });
    });
  }, []);

  // Handle solar panel state changes
  const handleSolarActiveChange = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'solar-1') {
          return {
            ...node,
            data: {
              ...node.data,
              solarActive: value,
            },
          };
        }
        return node;
      });
    });

    // Update connected edges animation
    setEdges((eds) => {
      return eds.map((edge) => {
        if (edge.source === 'solar-1') {
          return {
            ...edge,
            animated: value,
          };
        }
        return edge;
      });
    });

    // If solar is turned off, activate backup generator
    if (!value) {
      setNodes((nds) => {
        return nds.map((node: RFNode) => {
          if (node.id === 'generator-1') {
            return {
              ...node,
              data: {
                ...node.data,
                generatorOn: true,
              },
            };
          }
          return node;
        });
      });
    }
  }, []);

  // Handle generator state changes
  const handleGeneratorChange = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'generator-1') {
          return {
            ...node,
            data: {
              ...node.data,
              generatorOn: value,
            },
          };
        }
        return node;
      });
    });

    // Update connected edges animation
    setEdges((eds) => {
      return eds.map((edge) => {
        if (edge.source === 'generator-1') {
          return {
            ...edge,
            animated: value,
          };
        }
        return edge;
      });
    });
  }, []);

  // Handle charge controller backup mode changes
  const handleChargeControllerBackupMode = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'controller-1') {
          return {
            ...node,
            data: {
              ...node.data,
              backupMode: value,
            },
          };
        }
        return node;
      });
    });
  }, []);

  // Handle inverter state changes
  const handleInverterChange = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'inverter-1') {
          return {
            ...node,
            data: {
              ...node.data,
              inverterOn: value,
            },
          };
        }
        return node;
      });
    });

    // Update connected edges animation
    setEdges((eds) => {
      return eds.map((edge) => {
        if (edge.source === 'inverter-1') {
          return {
            ...edge,
            animated: value,
          };
        }
        return edge;
      });
    });
  }, []);

  // Handle wall outlet state changes
  const handleWallOutletChange = useCallback((value: boolean) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'outlet-1') {
          return {
            ...node,
            data: {
              ...node.data,
              outletActive: value,
            },
          };
        }
        return node;
      });
    });
  }, []);

  // Handle weather condition change
  const handleWeatherChange = useCallback((condition: 'sunny' | 'cloudy' | 'rainy') => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'weather-1') {
          return {
            ...node,
            data: {
              ...node.data,
              weatherCondition: condition,
            },
          };
        }
        if (node.id === 'solar-1') {
          const efficiency = node.data.efficiency ?? (condition === 'sunny' ? 100 : condition === 'cloudy' ? 56 : 22);
          const shouldSwitchOff = condition === 'rainy' && efficiency <= 20;
          return {
            ...node,
            data: {
              ...node.data,
              weatherCondition: condition,
              efficiency,
              solarActive: !shouldSwitchOff,
            },
          };
        }
        if (node.id === 'generator-1') {
          const efficiency = node.data.efficiency ?? (condition === 'sunny' ? 100 : condition === 'cloudy' ? 56 : 22);
          const shouldStartGenerator = condition === 'rainy' && efficiency <= 20;
          return {
            ...node,
            data: {
              ...node.data,
              generatorOn: shouldStartGenerator,
            },
          };
        }
        if (node.id === 'sensor-1') {
          return {
            ...node,
            data: {
              ...node.data,
              sunIntensity: condition === 'sunny' ? 80 : condition === 'cloudy' ? 40 : 20,
              cloudCover: condition === 'sunny' ? 20 : condition === 'cloudy' ? 70 : 90,
            },
          };
        }
        if (node.id === 'battery-1') {
          return {
            ...node,
            data: {
              ...node.data,
              weatherCondition: condition,
            },
          };
        }
        if (node.id === 'controller-1') {
          return {
            ...node,
            data: {
              ...node.data,
              weatherCondition: condition,
            },
          };
        }
        if (node.id === 'monitor-1') {
          return {
            ...node,
            data: {
              ...node.data,
              weatherCondition: condition,
            },
          };
        }
        return node;
      });
    });
  }, []);

  // Handle weather efficiency change
  const handleWeatherEfficiencyChange = useCallback((efficiency: number) => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        if (node.id === 'weather-1') {
          return {
            ...node,
            data: {
              ...node.data,
              efficiency,
            },
          };
        }
        if (node.id === 'solar-1') {
          const weatherCondition = node.data.weatherCondition ?? 'sunny';
          const shouldSwitchOff = weatherCondition === 'rainy' && efficiency <= 20;
          const shouldSwitchOn = efficiency > 30;
          return {
            ...node,
            data: {
              ...node.data,
              efficiency,
              solarActive: shouldSwitchOn || !shouldSwitchOff,
            },
          };
        }
        if (node.id === 'generator-1') {
          const weatherCondition = node.data.weatherCondition ?? 'sunny';
          const shouldStartGenerator = weatherCondition === 'rainy' && efficiency <= 20;
          const shouldStopGenerator = efficiency > 30;
          return {
            ...node,
            data: {
              ...node.data,
              generatorOn: shouldStartGenerator && !shouldStopGenerator,
            },
          };
        }
        return node;
      });
    });
  }, []);

  // Initialize nodes with proper callbacks
  useEffect(() => {
    setNodes((nds) => {
      return nds.map((node: RFNode) => {
        switch (node.id) {
          case 'transformer-1':
            return {
              ...node,
              data: {
                ...node.data,
                onTransformerChange: handleTransformerChange,
              },
            };
          case 'solar-1':
            return {
              ...node,
              data: {
                ...node.data,
                onSolarActiveChange: handleSolarActiveChange,
              },
            };
          case 'generator-1':
            return {
              ...node,
              data: {
                ...node.data,
                onGeneratorChange: handleGeneratorChange,
                generatorOn: false,
                fuelLevel: 100,
              },
            };
          case 'controller-1':
            return {
              ...node,
              data: {
                ...node.data,
                onToggleBackupMode: handleChargeControllerBackupMode,
              },
            };
          case 'inverter-1':
            return {
              ...node,
              data: {
                ...node.data,
                onInverterChange: handleInverterChange,
              },
            };
          case 'outlet-1':
            return {
              ...node,
              data: {
                ...node.data,
                onOutletActiveChange: handleWallOutletChange,
              },
            };
          case 'weather-1':
            // Always return a new object for weather-1 to ensure React Flow updates the node
            return {
              ...node,
              key: `weather-1-${node.data.weatherCondition || ''}-${Date.now()}`,
              data: {
                ...node.data,
                onWeatherChange: (condition: 'sunny' | 'cloudy' | 'rainy') => handleWeatherChange(condition),
                onEfficiencyChange: (efficiency: number) => handleWeatherEfficiencyChange(efficiency),
              },
            };
          default:
            return node;
        }
      });
    });
  }, [
    handleTransformerChange,
    handleSolarActiveChange,
    handleGeneratorChange,
    handleChargeControllerBackupMode,
    handleInverterChange,
    handleWallOutletChange,
    handleWeatherChange,
    handleWeatherEfficiencyChange
  ]);

  // Wire up the light switch and bulb for interactive control
  useEffect(() => {
    setNodes(nds =>
      nds.map(node => {
        // Wire up the switch to control the bulb
        if (node.id === 'light-switch-1') {
          return {
            ...node,
            data: {
              ...node.data,
              onSwitchToggle: (value: boolean) => {
                setNodes(current =>
                  current.map(n => {
                    if (n.id === 'light-switch-1') {
                      return { ...n, data: { ...n.data, switchOn: value } };
                    }
                    if (n.id === 'bulb-1') {
                      return { ...n, data: { ...n.data, bulbOn: value } };
                    }
                    return n;
                  })
                );
              },
            },
          };
        }
        // Wire up the bulb to control the switch (optional, for two-way sync)
        if (node.id === 'bulb-1') {
          return {
            ...node,
            data: {
              ...node.data,
              onBulbToggle: (value: boolean) => {
                setNodes(current =>
                  current.map(n => {
                    if (n.id === 'bulb-1') {
                      return { ...n, data: { ...n.data, bulbOn: value } };
                    }
                    if (n.id === 'light-switch-1') {
                      return { ...n, data: { ...n.data, switchOn: value } };
                    }
                    return n;
                  })
                );
              },
            },
          };
        }
        return node;
      })
    );
  }, [nodes, setNodes]);

  // Handle node changes
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Helper to re-apply all node callbacks after layout or node changes
  function withCallbacks(nodes: RFNode[]): RFNode[] {
    return nodes.map((node: RFNode) => {
      // Preserve the translation function for all nodes
      const baseNode = {
        ...node,
        data: {
          ...node.data,
          t, // Always include the current translation function
        },
      };

      switch (node.id) {
        case 'generator-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onGeneratorChange: (value: boolean) => handleGeneratorChange(value),
            },
          };
        case 'transformer-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onTransformerChange: (value: boolean) => handleTransformerChange(value),
            },
          };
        case 'solar-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onSolarActiveChange: (value: boolean) => handleSolarActiveChange(value),
            },
          };
        case 'distribution-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onToggleDevice: (id: string) => {
                // Example: toggle device on/off by id
                setNodes(current =>
                  withCallbacks(current.map((n: RFNode) => {
                    if (n.id === 'distribution-1') {
                      return {
                        ...n,
                        data: {
                          ...n.data,
                          devices: n.data.devices.map((dev: any) =>
                            dev.id === id ? { ...dev, on: !dev.on } : dev
                          ),
                        },
                      };
                    }
                    return n;
                  }))
                );
              },
              onToggleGridConnection: (value: boolean) => {
                setNodes(current =>
                  withCallbacks(current.map((n: RFNode) => {
                    if (n.id === 'distribution-1') {
                      return {
                        ...n,
                        data: {
                          ...n.data,
                          gridConnected: value,
                        },
                      };
                    }
                    return n;
                  }))
                );
              },
            },
          };
        case 'light-switch-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onSwitchToggle: (value: boolean) => {
                setNodes(current =>
                  withCallbacks(current.map((n: RFNode) => {
                    if (n.id === 'light-switch-1') {
                      return { ...n, data: { ...n.data, switchOn: value } };
                    }
                    if (n.id === 'bulb-1') {
                      return { ...n, data: { ...n.data, bulbOn: value } };
                    }
                    return n;
                  }))
                );
              },
            },
          };
        case 'bulb-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onBulbToggle: (value: boolean) => {
                setNodes(current =>
                  withCallbacks(current.map((n: RFNode) => {
                    if (n.id === 'bulb-1') {
                      return { ...n, data: { ...n.data, bulbOn: value } };
                    }
                    if (n.id === 'light-switch-1') {
                      return { ...n, data: { ...n.data, switchOn: value } };
                    }
                    return n;
                  }))
                );
              },
            },
          };
        case 'weather-1':
          return {
            ...baseNode,
            data: {
              ...baseNode.data,
              onWeatherChange: (condition: 'sunny' | 'cloudy' | 'rainy') => handleWeatherChange(condition),
              onEfficiencyChange: (efficiency: number) => handleWeatherEfficiencyChange(efficiency),
            },
          };
        // Add more cases for other nodes with callbacks as needed
        default:
          return baseNode;
      }
    });
  }

  // In ELK layout useEffect, use withCallbacks before setNodes
  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) return;
    const runLayout = async () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(
        nodes,
        edges,
        layoutOptions.layered
      );
      setNodes(withCallbacks(layoutedNodes));
      setEdges(layoutedEdges);
    };
    runLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, edges.length]);

  // Add a handler for layout selection that supports 'custom'
  const handleApplyLayout = useCallback((layoutType: LayoutType) => {
    if (layoutType === 'custom') {
      setCurrentLayoutType('custom');
    } else {
      applyLayout(layoutType);
    }
  }, [applyLayout]);

  return (
    <>
      {/* Show layout selection card only when showLayoutCard is true */}
      {showLayoutCard && (
        <LayoutSelectionCard 
          onApplyLayout={handleApplyLayout} 
          onClose={closeLayoutCard} 
          language={language}
          onOpenSettings={() => setShowLayoutSettings(true)}
        />
      )}
      
      {isLayouting && (
        <div className="layout-loading">
          <div className="layout-loading__spinner"></div>
          <div className="layout-loading__text">
            {currentLayoutType === 'tree' && t('Organizing elements in a hierarchical tree structure...')}
            {currentLayoutType === 'force' && t('Running physics simulation for natural positioning...')}
            {currentLayoutType === 'layered' && t('Creating layered hierarchy for optimal flow...')}
            {currentLayoutType === 'hierarchical' && t('Building bottom-up hierarchical structure with balanced spacing...')}
            {currentLayoutType === 'powerSystem' && t('Arranging power sources on the left side in order: Transformer, Solar, Generator, Battery...')}
            {!currentLayoutType && t('Calculating optimal layout...')}
          </div>
        </div>
      )}
      
      {/* Add LayoutSettings component */}
      {showLayoutSettings && (
        <LayoutSettings
          onApplySettings={handleLayoutSettings}
          onClose={() => setShowLayoutSettings(false)}
          currentLayout={currentLayoutType && currentLayoutType !== 'custom' ? currentLayoutType : 'powerSourcesColumn'}
        />
      )}
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={{ padding: 0.2, duration: 800 }}
        className={cn(
          isLayouting ? 'layout-transition active' : ''
        )}
        style={{ 
          background: backgroundColor || 'var(--app-background)',
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodesDraggable={manualDragMode}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </>
  );
}

// Main App component
function App() {
  const [showLayoutSettings, setShowLayoutSettings] = useState(false);
  
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      <PowerVisionHeader onOpenSettings={() => setShowLayoutSettings(true)} />
      
      <div className="absolute inset-0 pt-16">
        <ReactFlowProvider>
          <Flow 
            showLayoutSettings={showLayoutSettings}
            setShowLayoutSettings={setShowLayoutSettings}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;