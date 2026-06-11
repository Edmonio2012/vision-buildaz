import { useEffect, useState } from "react";

const STORAGE_KEY = "yrlgd_progress";

type ProgressState = Record<string, boolean>;

function readProgress(): ProgressState {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as ProgressState) : {};
  } catch {
    return {};
  }
}

export function useCourseProgress(): {
  completedItems: ProgressState;
  getCourseProgress: (itemIds: string[]) => number;
  toggleItem: (itemId: string) => void;
} {
  const [completedItems, setCompletedItems] = useState<ProgressState>(() => readProgress());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleItem = (itemId: string): void => {
    setCompletedItems((current) => ({
      ...current,
      [itemId]: !current[itemId]
    }));
  };

  const getCourseProgress = (itemIds: string[]): number => {
    if (itemIds.length === 0) return 0;

    const completedCount = itemIds.filter((itemId) => completedItems[itemId]).length;
    return Math.round((completedCount / itemIds.length) * 100);
  };

  return {
    completedItems,
    getCourseProgress,
    toggleItem
  };
}
