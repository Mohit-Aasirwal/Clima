export const storage = {
  getLastCity(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("lastCity");
  },

  setLastCity(city: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("lastCity", city);
  },

  clearLastCity(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("lastCity");
  },
};
