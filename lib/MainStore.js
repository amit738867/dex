import { create } from 'zustand';


const useSearchStore = create((set) => ({
  searchHistory: [],
  addSearch: (key) =>
    set((state) => ({
      searchHistory: [...state.searchHistory,  key ],
    })),
  clearHistory: () => set({ searchHistory: [] }),
}));

export default useSearchStore;
