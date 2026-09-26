'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export type Workout = {
  id: string | number;
  name: string;
  image?: string;
  equipment?: string[] | string;
  duration?: string;
  calories?: number | string;
  rating?: number | string;
  [key: string]: any;
};

type PlanContextType = {
  todayPlan: Workout[];
  savedPlan: Workout[];
  addToTodayPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromTodayPlan: (id: string | number) => void;
  removeFromSavedPlan: (id: string | number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedPlan, setSavedPlan] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load plans from localStorage on mount
  useEffect(() => {
    try {
      const storedToday = localStorage.getItem('fitlog_today_plan');
      const storedSaved = localStorage.getItem('fitlog_saved_plan');

      if (storedToday) setTodayPlan(JSON.parse(storedToday));
      if (storedSaved) setSavedPlan(JSON.parse(storedSaved));
    } catch (error) {
      console.error('Failed to load plans from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync todayPlan changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  // Sync savedPlan changes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_saved_plan', JSON.stringify(savedPlan));
    }
  }, [savedPlan, isLoaded]);

  // Add to Today's Plan (With 5-lift Cap Limit)
  const addToTodayPlan = (workout: Workout) => {
    const isAlreadyAdded = todayPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (isAlreadyAdded) {
      toast.error("Already saved in today's plan", {
        style: { background: '#27272a', color: '#facc15' },
      });
      return;
    }

    if (todayPlan.length >= 5) {
      toast.error('Cap of five lifts reached for today!', {
        style: { background: '#27272a', color: '#f87171' },
      });
      return;
    }

    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan", {
      style: { background: '#27272a', color: '#a3e635' },
    });
  };

  // Save for Later
  const saveForLater = (workout: Workout) => {
    const isAlreadySaved = savedPlan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (isAlreadySaved) {
      toast.error('Already saved for later', {
        style: { background: '#27272a', color: '#facc15' },
      });
      return;
    }

    setSavedPlan((prev) => [...prev, workout]);
    toast.success('Saved for later', {
      style: { background: '#27272a', color: '#a3e635' },
    });
  };

  // Remove from Today's Plan
  const removeFromTodayPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Removed from today's plan", {
      style: { background: '#27272a', color: '#f43f5e' },
    });
  };

  // Remove from Saved Plan
  const removeFromSavedPlan = (id: string | number) => {
    setSavedPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success('Removed from saved list', {
      style: { background: '#27272a', color: '#f43f5e' },
    });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSavedPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}