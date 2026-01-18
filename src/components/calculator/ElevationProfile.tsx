'use client';

import { useState } from 'react';
import type { ElevationPoint, ProfilePointData, UnitSystem } from '@/lib/types';
import { kmToMi, mToFt, kmhToMph } from '@/lib/calculations';

interface ElevationProfileProps {
  profile: ElevationPoint[];
  profileData?: ProfilePointData[];
  userPower?: number;
  className?: string;
  unitSystem: UnitSystem;
}

// Get color based on gradient percentage
function getGradientColor(gradient: number): string {
  if (gradient < 5) return '#22c55e';      // green
  if (gradient < 8) return '#eab308';      // yellow
  if (gradient < 12) return '#f97316';     // orange
  return '#ef4444';                         // red
}

export function ElevationProfile({ profile, profileData, userPower, className = '', unitSystem }: ElevationProfileProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const isImperial = unitSystem === 'imperial';

  if (!profile || profile.length < 2) return null;

  // Chart dimensions
  const width = 400;
  const height = 140;
  const padding = { top: 10, right: 10, bottom: 25, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxDistance = Math.max(...profile.map(p => p.distance));
  const minElevation = Math.min(...profile.map(p => p.elevation));
  const maxElevation = Math.max(...profile.map(p => p.elevation));
  const elevationRange = maxElevation - minElevation || 1;

  // Scale functions
  const scaleX = (distance: number) => (distance / maxDistance) * chartWidth;
  const scaleY = (elevation: number) => chartHeight - ((elevation - minElevation) / elevationRange) * chartHeight;

  // Create path segments with gradient coloring
  const segments: { path: string; color: string }[] = [];
  for (let i = 0; i < profile.length - 1; i++) {
    const p1 = profile[i];
    const p2 = profile[i + 1];
    const x1 = scaleX(p1.distance);
    const y1 = scaleY(p1.elevation);
    const x2 = scaleX(p2.distance);
    const y2 = scaleY(p2.elevation);

    const segmentGradient = (p1.gradient + p2.gradient) / 2;

    segments.push({
      path: `M ${x1} ${y1} L ${x2} ${y2}`,
      color: getGradientColor(segmentGradient)
    });
  }

  // Create filled area path for elevation
  const areaPath = profile.map((p, i) => {
    const x = scaleX(p.distance);
    const y = scaleY(p.elevation);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ') + ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  // Y-axis ticks for elevation
  const yTicks: number[] = [];
  const tickCount = 3;
  for (let i = 0; i <= tickCount; i++) {
    yTicks.push(Math.round(minElevation + (elevationRange * i) / tickCount));
  }

  // X-axis ticks
  const xTicks = [0, Math.round(maxDistance / 2 * 10) / 10, maxDistance];

  // Get hovered point data
  const hoveredData = hoveredPoint !== null && profileData ? profileData[hoveredPoint] : null;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Definitions */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Filled area for elevation */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
            />

            {/* Gradient-colored elevation line segments */}
            {segments.map((segment, i) => (
              <path
                key={i}
                d={segment.path}
                stroke={segment.color}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            ))}

            {/* Interactive data points */}
            {profile.map((point, i) => {
              const x = scaleX(point.distance);
              const y = scaleY(point.elevation);
              const isHovered = hoveredPoint === i;
              const data = profileData?.[i];

              return (
                <g key={i}>
                  {/* Invisible larger hit area for easier hovering */}
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Visible point */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={getGradientColor(point.gradient)}
                    stroke="white"
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-all duration-150 pointer-events-none"
                  />
                  {/* Elevation label on hover */}
                  {isHovered && (
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="text-[9px] font-medium fill-gray-700 dark:fill-slate-200 pointer-events-none"
                    >
                      {isImperial
                        ? `${Math.round(mToFt(point.elevation)).toLocaleString()}ft`
                        : `${point.elevation.toLocaleString()}m`}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Left Y-axis (elevation) */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={chartHeight}
              stroke="currentColor"
              strokeOpacity="0.2"
              className="text-gray-400 dark:text-slate-500"
            />
            {yTicks.map((tick, i) => (
              <g key={i}>
                <line
                  x1="-4"
                  y1={scaleY(tick)}
                  x2="0"
                  y2={scaleY(tick)}
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  className="text-gray-400 dark:text-slate-500"
                />
                <text
                  x="-8"
                  y={scaleY(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-[9px] fill-gray-500 dark:fill-slate-400"
                >
                  {isImperial ? `${Math.round(mToFt(tick))}ft` : `${tick}m`}
                </text>
              </g>
            ))}

            {/* X-axis */}
            <line
              x1="0"
              y1={chartHeight}
              x2={chartWidth}
              y2={chartHeight}
              stroke="currentColor"
              strokeOpacity="0.2"
              className="text-gray-400 dark:text-slate-500"
            />
            {xTicks.map((tick, i) => (
              <g key={i}>
                <line
                  x1={scaleX(tick)}
                  y1={chartHeight}
                  x2={scaleX(tick)}
                  y2={chartHeight + 4}
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  className="text-gray-400 dark:text-slate-500"
                />
                <text
                  x={scaleX(tick)}
                  y={chartHeight + 14}
                  textAnchor="middle"
                  className="text-[9px] fill-gray-500 dark:fill-slate-400"
                >
                  {isImperial ? `${kmToMi(tick).toFixed(1)}mi` : `${tick}km`}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Popover tooltip */}
        {hoveredData && hoveredPoint !== null && (
          <div
            className="absolute z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 p-3 text-sm pointer-events-none"
            style={{
              left: `${((scaleX(hoveredData.distance) + padding.left) / width) * 100}%`,
              top: '0',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="font-semibold text-gray-900 dark:text-white mb-2">
              {isImperial
                ? `${kmToMi(hoveredData.distance).toFixed(1)} mi • ${Math.round(mToFt(hoveredData.elevation)).toLocaleString()}ft`
                : `${hoveredData.distance.toFixed(1)} km • ${hoveredData.elevation.toLocaleString()}m`}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-slate-400">Gradient:</span>
                <span className="font-medium" style={{ color: getGradientColor(hoveredData.gradient) }}>
                  {hoveredData.gradient.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-slate-400">Speed:</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {isImperial
                    ? `${kmhToMph(hoveredData.speedKmh).toFixed(1)} mph`
                    : `${hoveredData.speedKmh.toFixed(1)} km/h`}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-slate-400">Oxygen:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {hoveredData.oxygenPercent.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500 dark:text-slate-400">Power:</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {hoveredData.powerPercent.toFixed(1)}% ({Math.round(hoveredData.effectivePower)}W)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-[10px] text-gray-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> &lt;5%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> 5-8%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500" /> 8-12%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> &gt;12%
        </span>
        {profileData && (
          <span className="text-purple-600 dark:text-purple-400 ml-2 border-l border-gray-300 dark:border-slate-600 pl-2">
            Hover points for altitude data
          </span>
        )}
      </div>

      {/* Altitude effect note */}
      {profileData && (
        <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-[10px] text-purple-700 dark:text-purple-300">
          <strong>Altitude effect:</strong> Power output decreases from {profileData[0]?.powerPercent.toFixed(0)}%
          ({Math.round(profileData[0]?.effectivePower)}W) to {profileData[profileData.length - 1]?.powerPercent.toFixed(0)}%
          ({Math.round(profileData[profileData.length - 1]?.effectivePower)}W) due to reduced oxygen.
          Time estimate accounts for this degradation.
        </div>
      )}
    </div>
  );
}
