import { create } from "zustand";

interface ScheduleState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  selectedDate: new Date(2024, 0, 18),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
