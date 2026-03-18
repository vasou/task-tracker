export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window !== "undefined") return null;
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Storage get error:", key, error);
      return null;
    }
  },
  set: (key: string, value: unknown) => {
    if (typeof window !== "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage set error:", key, error);
    }
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") return;
    localStorage.removeItem(key);
  },
};
