import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface FontScalingContextType {
  fontScalingEnabled: boolean;
  toggleFontScaling: () => Promise<void>;
}

export const FontScalingContext = createContext<FontScalingContextType>({
  fontScalingEnabled: true,
  toggleFontScaling: async () => {},
});

export function FontScalingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontScalingEnabled, setFontScalingEnabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("fontScalingEnabled")
      .then((value) => {
        if (value !== null) {
          setFontScalingEnabled(value === "true");
        }
      })
      .catch((error) => {
        console.error("Error loading font scaling preference:", error);
      });
  }, []);

  const toggleFontScaling = useCallback(async () => {
    const newValue = !fontScalingEnabled;
    setFontScalingEnabled(newValue);
    try {
      await AsyncStorage.setItem("fontScalingEnabled", String(newValue));
    } catch (error) {
      console.error("Error saving font scaling preference:", error);
      setFontScalingEnabled(!newValue);
    }
  }, [fontScalingEnabled]);

  return (
    <FontScalingContext.Provider
      value={{ fontScalingEnabled, toggleFontScaling }}
    >
      {children}
    </FontScalingContext.Provider>
  );
}

export const useFontScaling = () => useContext(FontScalingContext);
