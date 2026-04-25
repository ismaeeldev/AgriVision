"use client";

import { useState, useCallback, useMemo } from 'react';
import { Coordinate, FieldData, AnalysisResult } from './field.types';

export const useFieldState = () => {
  const [points, setPoints] = useState<Coordinate[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fieldData, setFieldData] = useState<FieldData | null>(null);

  const addPoint = useCallback((point: Coordinate) => {
    setPoints((prev) => [...prev, point]);
  }, []);

  const clearPoints = useCallback(() => {
    setPoints([]);
    setFieldData(null);
  }, []);

  const calculateArea = useCallback((coords: Coordinate[]) => {
    if (coords.length < 3) return 0;
    
    // Simple Shoelace formula for area (not perfectly accurate for large areas on sphere but good for farms)
    let area = 0;
    for (let i = 0; i < coords.length; i++) {
      const j = (i + 1) % coords.length;
      area += coords[i].lat * coords[j].lng;
      area -= coords[j].lat * coords[i].lng;
    }
    area = Math.abs(area) / 2;
    
    // Convert to approximate acres (rough conversion for small local areas)
    // In a real app, use @turf/area
    return area * 247105; // Dummy multiplier for demo
  }, []);

  const calculatePerimeter = useCallback((coords: Coordinate[]) => {
    if (coords.length < 2) return 0;
    let perimeter = 0;
    for (let i = 0; i < coords.length; i++) {
      const j = (i + 1) % coords.length;
      const dLat = (coords[j].lat - coords[i].lat) * Math.PI / 180;
      const dLng = (coords[j].lng - coords[i].lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(coords[i].lat * Math.PI / 180) * Math.cos(coords[j].lat * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      perimeter += 6371000 * c; // Earth radius in meters
    }
    return perimeter;
  }, []);

  const saveField = useCallback(() => {
    if (points.length < 3) return;
    
    const newField: FieldData = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Field ${new Date().toLocaleDateString()}`,
      boundary: points,
      area: calculateArea(points),
      perimeter: calculatePerimeter(points),
      status: 'saved',
      lastAnalysis: {
        healthIndex: 72 + Math.floor(Math.random() * 15),
        moisture: 'Medium',
        ndvi: 0.65 + (Math.random() * 0.1),
        riskLevel: 'Low',
        timestamp: new Date().toISOString(),
      }
    };
    
    setFieldData(newField);
    setIsDrawing(false);
  }, [points, calculateArea, calculatePerimeter]);

  return {
    points,
    setPoints,
    addPoint,
    clearPoints,
    isDrawing,
    setIsDrawing,
    fieldData,
    saveField
  };
};
