import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, IndianRupee, Home, Layers, CheckCircle2, Bath, Sofa, Box, Maximize, ArrowUp, Paintbrush, Utensils, Sparkles, CarFront, TrendingUp, ChevronDown, ChevronUp, Map } from 'lucide-react';

export default function CostEstimator() {
  const [region, setRegion] = useState<string>('Chandigarh Region');
  const [floors, setFloors] = useState<number>(2);
  const [builtUpArea, setBuiltUpArea] = useState<string>('');
  const [floorRooms, setFloorRooms] = useState<number[]>([2, 1, 0, 0]); // Rooms for up to 4 floors
  const [roomSizeType, setRoomSizeType] = useState<'preset' | 'custom'>('preset');
  const [roomSizePreset, setRoomSizePreset] = useState<'Small' | 'Medium' | 'Big'>('Medium');
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('15');
  const [washrooms, setWashrooms] = useState<number>(2);
  const [kitchens, setKitchens] = useState<number>(1);
  
  const [hasStore, setHasStore] = useState<boolean>(false);
  const [hasLobby, setHasLobby] = useState<boolean>(true);
  const [hasDrawingRoom, setHasDrawingRoom] = useState<boolean>(true);
  const [hasFamilyLounge, setHasFamilyLounge] = useState<boolean>(false);
  const [hasPrayerRoom, setHasPrayerRoom] = useState<boolean>(false);
  const [hasPorch, setHasPorch] = useState<boolean>(true);
  const [hasStairs, setHasStairs] = useState<boolean>(true);
  
  const [complexity, setComplexity] = useState<'Simple' | 'Standard' | 'Complex' | 'Very Complex' | 'Custom'>('Standard');
  const [customFactor, setCustomFactor] = useState<number>(10);
  
  const [quality, setQuality] = useState<'A' | 'B' | 'C'>('B');
  const [hasBasement, setHasBasement] = useState<boolean>(false);
  const [furnishing, setFurnishing] = useState<'None' | 'Interior' | 'Furnished'>('None');
  
  const [plotLength, setPlotLength] = useState<string>('');
  const [plotWidth, setPlotWidth] = useState<string>('');
  const [plotArea, setPlotArea] = useState<string>('');
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [estimate, setEstimate] = useState<{ min: number; max: number; area: number } | null>(null);

  useEffect(() => {
    if (floors > 1 && !hasStairs) {
      setHasStairs(true);
    }
  }, [floors]);

  useEffect(() => {
    calculateEstimate();
  }, [region, floors, builtUpArea, floorRooms, roomSizeType, roomSizePreset, roomLength, roomWidth, washrooms, kitchens, hasStore, hasLobby, hasDrawingRoom, hasFamilyLounge, hasPrayerRoom, hasPorch, hasStairs, quality, hasBasement, furnishing, complexity, customFactor]);

  const calculateEstimate = () => {
    const bArea = parseFloat(builtUpArea) || 0;
    
    const activeFloorRooms = floorRooms.slice(0, floors);
    const totalRooms = activeFloorRooms.reduce((sum, r) => sum + r, 0);
    
    if (totalRooms === 0 && bArea === 0 && !hasStore && !hasLobby && !hasDrawingRoom && !hasFamilyLounge && !hasPrayerRoom && !hasPorch && !hasStairs && kitchens === 0 && washrooms === 0) {
      setEstimate(null);
      return;
    }

    const roomSizes = {
      'Small': 120,
      'Medium': 180,
      'Big': 250
    };
    const areaPerRoom = roomSizeType === 'preset' 
      ? roomSizes[roomSizePreset] 
      : (parseFloat(roomLength) || 0) * (parseFloat(roomWidth) || 0);
    
    const roomsArea = totalRooms * areaPerRoom;
    const drawingRoomArea = hasDrawingRoom ? 250 : 0;
    const washroomsArea = washrooms * 60;
    const kitchensArea = kitchens * 150;
    const storeArea = hasStore ? 80 : 0;
    const lobbyArea = hasLobby ? 315 : 0;
    const loungeArea = hasFamilyLounge ? 220 : 0;
    const prayerArea = hasPrayerRoom ? 40 : 0;
    const porchArea = hasPorch ? 220 : 0;
    const stairsArea = hasStairs ? 140 : 0;

    // Total functional area
    const functionalArea = roomsArea + drawingRoomArea + washroomsArea + kitchensArea + storeArea + lobbyArea + loungeArea + prayerArea + porchArea + stairsArea;
    
    // Wall and circulation factor based on complexity
    const complexityFactors = {
      'Simple': 1.08,
      'Standard': 1.10,
      'Complex': 1.15,
      'Very Complex': 1.20,
      'Custom': 1 + (customFactor / 100)
    };
    
    const factor = complexityFactors[complexity];
    const calculatedArea = functionalArea * factor;

    const effectiveBuiltUpArea = bArea > 0 ? bArea : calculatedArea;

    // Region Multipliers
    const regionMultipliers: Record<string, number> = {
      'Chandigarh Region': 1.1,
      'Ludhiana': 1.0,
      'Ambala': 1.0,
      'Delhi NCR': 1.15,
      'Sirhind': 1.0,
      'Himachal area': 1.25,
      'Other': 1.0
    };
    const regionMultiplier = regionMultipliers[region] || 1.0;

    // Base construction rates per sq.ft (approximate current Indian market rates)
    const rates = {
      'A': { min: 2000, max: 2500 }, // Premium
      'B': { min: 1500, max: 1800 }, // Standard
      'C': { min: 1200, max: 1400 }, // Basic
    };

    const baseRate = rates[quality];
    
    let minCost = effectiveBuiltUpArea * baseRate.min * regionMultiplier;
    let maxCost = effectiveBuiltUpArea * baseRate.max * regionMultiplier;

    // Basement calculation (assuming basement is roughly the size of the ground floor)
    if (hasBasement) {
      const gfRatio = totalRooms > 0 ? (floorRooms[0] / totalRooms) : 0.5;
      const basementArea = effectiveBuiltUpArea * gfRatio;
      const basementRate = 1000 * regionMultiplier; // Approx rate for basement
      minCost += basementArea * basementRate;
      maxCost += basementArea * (basementRate + 200);
    }

    // Furnishing & Interior calculation
    const furnishingRates = {
      'None': { min: 0, max: 0 },
      'Interior': { min: 600, max: 900 }, // Modular kitchen, wardrobes, false ceiling
      'Furnished': { min: 1200, max: 1800 } // Complete interior + furniture
    };

    const fRate = furnishingRates[furnishing];
    minCost += effectiveBuiltUpArea * fRate.min;
    maxCost += effectiveBuiltUpArea * fRate.max;
    
    setEstimate({
      min: minCost,
      max: maxCost,
      area: effectiveBuiltUpArea
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lac`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  const handlePlotLengthChange = (val: string) => {
    setPlotLength(val);
    const l = parseFloat(val);
    const w = parseFloat(plotWidth);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setPlotArea((l * w).toString());
    }
  };

  const handlePlotWidthChange = (val: string) => {
    setPlotWidth(val);
    const l = parseFloat(plotLength);
    const w = parseFloat(val);
    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      setPlotArea((l * w).toString());
    }
  };

  const handlePlotAreaChange = (val: string) => {
    setPlotArea(val);
    setPlotLength('');
    setPlotWidth('');
  };

  const getWhatsAppLink = () => {
    if (!estimate) return "https://wa.me/916283116822";

    const additionalSpaces = [];
    if (hasStore) additionalSpaces.push("Store Room");
    if (hasLobby) additionalSpaces.push("Lobby");
    if (hasDrawingRoom) additionalSpaces.push("Drawing Room");
    if (hasFamilyLounge) additionalSpaces.push("Family Lounge");
    if (hasPrayerRoom) additionalSpaces.push("Prayer Room");
    if (hasPorch) additionalSpaces.push("Porch / Parking");
    if (hasStairs) additionalSpaces.push("Staircase");

    const spacesText = additionalSpaces.length > 0 ? additionalSpaces.join(", ") : "None";
    const roomSizeText = roomSizeType === 'preset' ? roomSizePreset : `${roomLength}x${roomWidth} ft`;

    const message = `Hi, I would like to get a detailed quote for my construction project. Here are my requirements:

*Location:* ${region}

*Floor Plan:*
${plotArea ? `- Plot Area: ${plotArea} sq.ft ${plotLength && plotWidth ? `(${plotLength}x${plotWidth} ft)` : ''}\n` : ''}- Total Floors: ${floors}
${floorRooms.slice(0, floors).map((r, i) => `- Floor ${i === 0 ? 'G' : i}: ${r} Rooms`).join('\n')}
- Approx. Room Size: ${roomSizeText}
- Washrooms: ${washrooms}
- Kitchens: ${kitchens}

*Additional Spaces:*
- ${spacesText}

*Construction Details:*
- Quality Class: Class ${quality}
- Building Complexity: ${complexity}${complexity === 'Custom' ? ` (${customFactor}%)` : ''}
- Interior & Furnishing: ${furnishing}
- Basement: ${hasBasement ? 'Yes' : 'No'}
${builtUpArea ? `- Custom Built-up Area: ${builtUpArea} sq.ft\n` : ''}*Estimates:*
- Est. Built-up Area: ${estimate.area.toFixed(0)} sq.ft
- Estimated Cost: ${formatCurrency(estimate.min)} to ${formatCurrency(estimate.max)}

Please let me know the next steps!`;

    return `https://wa.me/916283116822?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto" id="cost-estimator">
      <div className="flex flex-col items-center text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Construction Cost Estimator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Plan your budget with our intelligent cost calculator. Get an instant approximate estimate based on your requirements.
          </p>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-2 mx-auto px-8 py-4 bg-[#F2C94C] hover:bg-[#e5bc40] text-black font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Calculator className="w-5 h-5" />
            {isOpen ? 'Hide Calculator' : 'Open Cost Calculator'}
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-8">
              {/* Form Section */}
              <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Region Selection */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Map className="w-4 h-4 text-[#F2C94C]" /> Select Region / Area
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Chandigarh Region', 'Ludhiana', 'Ambala', 'Delhi NCR', 'Sirhind', 'Himachal area', 'Other'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                      region === r ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Floors */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Layers className="w-4 h-4 text-[#F2C94C]" /> Number of Floors
              </label>
              <div className="flex gap-2 sm:gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={`floor-${num}`}
                    onClick={() => setFloors(num)}
                    className={`flex-1 py-3 rounded-xl border font-bold transition-all text-sm sm:text-base ${
                      floors === num ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                    }`}
                  >
                    {num === 1 ? 'G' : `G+${num - 1}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Floor Rooms */}
            {Array.from({ length: floors }).map((_, i) => (
              <div key={`floor-input-${i}`} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  {i === 0 ? <Home className="w-4 h-4 text-[#F2C94C]" /> : <ArrowUp className="w-4 h-4 text-[#F2C94C]" />} 
                  {i === 0 ? 'Ground Floor (G)' : i === 1 ? 'First Floor (G+1)' : i === 2 ? 'Second Floor (G+2)' : 'Third Floor (G+3)'} Rooms
                </label>
                <select 
                  value={floorRooms[i]}
                  onChange={(e) => {
                    const newRooms = [...floorRooms];
                    newRooms[i] = Number(e.target.value);
                    setFloorRooms(newRooms);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map(num => (
                    <option key={`f${i}-${num}`} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            ))}

            {/* Room Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Maximize className="w-4 h-4 text-[#F2C94C]" /> Approx. Room Size
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setRoomSizeType('preset')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${roomSizeType === 'preset' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Standard
                  </button>
                  <button 
                    onClick={() => setRoomSizeType('custom')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${roomSizeType === 'custom' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Custom
                  </button>
                </div>
              </div>
              
              {roomSizeType === 'preset' ? (
                <select 
                  value={roomSizePreset}
                  onChange={(e) => setRoomSizePreset(e.target.value as 'Small' | 'Medium' | 'Big')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                >
                  <option value="Small">Small (~120 sq.ft)</option>
                  <option value="Medium">Medium (~180 sq.ft)</option>
                  <option value="Big">Big (~250 sq.ft)</option>
                </select>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="number" 
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                      placeholder="Length (ft)"
                    />
                  </div>
                  <div>
                    <input 
                      type="number" 
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
                      placeholder="Width (ft)"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Washrooms */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Bath className="w-4 h-4 text-[#F2C94C]" /> Washrooms Quantity
              </label>
              <select 
                value={washrooms}
                onChange={(e) => setWashrooms(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={`bath-${num}`} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Kitchens */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Utensils className="w-4 h-4 text-[#F2C94C]" /> Kitchens Quantity
              </label>
              <select 
                value={kitchens}
                onChange={(e) => setKitchens(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none bg-white"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={`kit-${num}`} value={num}>{num} {num === 1 ? 'Kitchen' : 'Kitchens'}</option>
                ))}
              </select>
            </div>

            {/* Additional Spaces */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Layers className="w-4 h-4 text-[#F2C94C]" /> Additional Spaces
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setHasDrawingRoom(!hasDrawingRoom)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasDrawingRoom ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasDrawingRoom ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Sofa className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Drawing Room</span>
                </button>

                <button
                  onClick={() => setHasStore(!hasStore)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasStore ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasStore ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Box className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Store Room</span>
                </button>

                <button
                  onClick={() => setHasLobby(!hasLobby)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasLobby ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasLobby ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Lobby</span>
                </button>

                <button
                  onClick={() => setHasFamilyLounge(!hasFamilyLounge)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasFamilyLounge ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasFamilyLounge ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Family Lounge</span>
                </button>

                <button
                  onClick={() => setHasPrayerRoom(!hasPrayerRoom)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasPrayerRoom ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasPrayerRoom ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Prayer Room</span>
                </button>

                <button
                  onClick={() => setHasPorch(!hasPorch)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    hasPorch ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${hasPorch ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <CarFront className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Porch / Parking</span>
                </button>

                <button
                  onClick={() => setHasStairs(!hasStairs)}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border transition-all text-left ${
                    hasStairs ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900 shadow-sm' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                  }`}
                >
                  <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${hasStairs ? 'bg-[#F2C94C] text-black' : 'bg-gray-100 text-gray-400'}`}>
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 h-4" />
                  </div>
                  <span className="font-bold text-[10px] sm:text-sm leading-tight">Staircase</span>
                </button>
              </div>
            </div>

            {/* Building Complexity */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Layers className="w-4 h-4 text-[#F2C94C]" /> Building Complexity
                </label>
                <span className="text-xs font-bold text-[#F2C94C] bg-[#F2C94C]/10 px-2 py-1 rounded-full">
                  Wall & Circ. Factor: {complexity === 'Custom' ? `${customFactor}%` : `${Math.round((({ 'Simple': 1.08, 'Standard': 1.10, 'Complex': 1.15, 'Very Complex': 1.20, 'Custom': 1 }[complexity]) - 1) * 100)}%`}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(['Simple', 'Standard', 'Complex', 'Very Complex', 'Custom'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setComplexity(c)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                      complexity === c ? 'border-[#F2C94C] bg-[#F2C94C]/10 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-[#F2C94C]/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {complexity === 'Custom' && (
                <div className="pt-2">
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="1"
                    value={customFactor}
                    onChange={(e) => setCustomFactor(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F2C94C]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Min (5%)</span>
                    <span>Max (30%)</span>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-gray-400 italic">
                *Adjusts the percentage of area added for walls, corridors, and circulation. Complex layouts require more space for these elements.
              </p>
            </div>

            {/* Quality of Construction */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#F2C94C]" /> Quality of Construction
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'A', name: 'Premium (Class A)', desc: 'Teak wood, Italian marble, premium fittings' },
                  { id: 'B', name: 'Standard (Class B)', desc: 'Vitrified tiles, flush doors, standard fittings' },
                  { id: 'C', name: 'Basic (Class C)', desc: 'Ceramic tiles, basic wood, economy fittings' }
                ].map((q) => (
                  <div 
                    key={q.id}
                    onClick={() => setQuality(q.id as 'A' | 'B' | 'C')}
                    className={`cursor-pointer border rounded-xl p-4 transition-all ${quality === q.id ? 'border-[#F2C94C] bg-[#F2C94C]/5 shadow-md' : 'border-gray-200 hover:border-[#F2C94C]/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{q.name}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${quality === q.id ? 'border-[#F2C94C]' : 'border-gray-300'}`}>
                        {quality === q.id && <div className="w-2 h-2 bg-[#F2C94C] rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{q.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Furnishing Level */}
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Paintbrush className="w-4 h-4 text-[#F2C94C]" /> Interior & Furnishing
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'None', name: 'Bare Shell', desc: 'Civil construction & basic finishing only' },
                  { id: 'Interior', name: 'Basic Interior', desc: 'Modular kitchen, wardrobes, false ceiling' },
                  { id: 'Furnished', name: 'Fully Furnished', desc: 'Complete interior + furniture & appliances' }
                ].map((f) => (
                  <div 
                    key={f.id}
                    onClick={() => setFurnishing(f.id as 'None' | 'Interior' | 'Furnished')}
                    className={`cursor-pointer border rounded-xl p-4 transition-all ${furnishing === f.id ? 'border-[#F2C94C] bg-[#F2C94C]/5 shadow-md' : 'border-gray-200 hover:border-[#F2C94C]/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900">{f.name}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${furnishing === f.id ? 'border-[#F2C94C]' : 'border-gray-300'}`}>
                        {furnishing === f.id && <div className="w-2 h-2 bg-[#F2C94C] rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Basement Toggle */}
            <div className="space-y-3 md:col-span-2 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="font-bold text-gray-900 block text-sm sm:text-base">Include Basement?</label>
                  <span className="text-[10px] sm:text-xs text-gray-500 leading-tight block">Adds extra cost for excavation and retaining walls</span>
                </div>
                <button 
                  onClick={() => setHasBasement(!hasBasement)}
                  className={`w-12 h-6 sm:w-14 sm:h-8 rounded-full transition-colors relative shrink-0 ${hasBasement ? 'bg-[#F2C94C]' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full absolute top-1 transition-all ${hasBasement ? 'left-7 sm:left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Area Override */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Maximize className="w-4 h-4 text-[#F2C94C]" /> Area Details
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold block">Plot Area <span className="font-normal">(Optional)</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input 
                        type="number" 
                        value={plotLength}
                        onChange={(e) => handlePlotLengthChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="L (ft)"
                      />
                    </div>
                    <div>
                      <input 
                        type="number" 
                        value={plotWidth}
                        onChange={(e) => handlePlotWidthChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="W (ft)"
                      />
                    </div>
                    <div>
                      <input 
                        type="number" 
                        value={plotArea}
                        onChange={(e) => handlePlotAreaChange(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                        placeholder="Total sq.ft"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold block">Built-up Area Override</label>
                  <input 
                    type="number" 
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#F2C94C] focus:ring-2 focus:ring-[#F2C94C]/20 transition-all outline-none"
                    placeholder="Override calculated sq.ft"
                  />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Result Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1A1A1A] rounded-3xl p-6 md:p-8 shadow-2xl text-white lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#F2C94C]/20 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#F2C94C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold">Estimated Cost</h3>
          </div>

          {estimate ? (
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Approximate Range</p>
                <div className="text-3xl md:text-4xl font-bold text-[#F2C94C]">
                  {formatCurrency(estimate.min)}
                </div>
                <div className="text-xl text-gray-300 mt-1">
                  to {formatCurrency(estimate.max)}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                {plotArea && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Plot Area:</span>
                    <div className="text-right">
                      <span className="font-bold block">{plotArea} sq.ft</span>
                      {plotLength && plotWidth && (
                        <span className="text-xs text-gray-400">({plotLength} × {plotWidth} ft)</span>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Region:</span>
                  <span className="font-bold">{region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Floors:</span>
                  <span className="font-bold">{floors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Est. Built-up Area:</span>
                  <span className="font-bold">{estimate.area.toFixed(0)} sq.ft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Complexity:</span>
                  <span className="font-bold">{complexity} ({complexity === 'Custom' ? `${customFactor}%` : `${Math.round((({ 'Simple': 1.08, 'Standard': 1.10, 'Complex': 1.15, 'Very Complex': 1.20, 'Custom': 1 }[complexity]) - 1) * 100)}%`})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Quality Class:</span>
                  <span className="font-bold">Class {quality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Furnishing:</span>
                  <span className="font-bold">{furnishing === 'None' ? 'Bare Shell' : furnishing === 'Interior' ? 'Basic Interior' : 'Fully Furnished'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Basement:</span>
                  <span className="font-bold">{hasBasement ? 'Included' : 'None'}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mt-6">
                <p className="text-xs text-gray-400 leading-relaxed">
                  *Disclaimer: This is a rough estimate based on current market rates. Actual costs may vary depending on location, material choices, soil conditions, and specific design requirements.
                </p>
              </div>

              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 bg-[#F2C94C] hover:bg-[#e5bc40] text-black text-center font-bold rounded-xl transition-colors mt-6"
              >
                Get a Detailed Quote
              </a>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <IndianRupee className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Select your requirements to see the estimated construction cost.</p>
            </div>
          )}
        </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
