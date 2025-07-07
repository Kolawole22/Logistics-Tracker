import { useFontScaling } from "@/contexts/FontScalingContext";
import React, { useCallback, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function Settings() {
  const { fontScalingEnabled, toggleFontScaling } = useFontScaling();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = useCallback(async () => {
    if (isToggling) return;
    setIsToggling(true);
    await toggleFontScaling();
    setIsToggling(false);
  }, [isToggling, toggleFontScaling]);

  const openSystemSettings = () => {
    Linking.openSettings();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.setting}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingTitle} allowFontScaling={false}>
              Dynamic Font Scaling
            </Text>
            <Switch
              value={fontScalingEnabled}
              onValueChange={handleToggle}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={fontScalingEnabled ? "#007AFF" : "#f4f3f4"}
              disabled={isToggling}
            />
          </View>
          <Text style={styles.description} allowFontScaling={false}>
            When enabled, text in the app will adjust to your system&apos;s font
            size settings. This helps make text more readable based on your
            preferences.
          </Text>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.demoTitle} allowFontScaling={false}>
            Preview
          </Text>
          <View style={styles.demoText}>
            <Text style={styles.small} allowFontScaling={fontScalingEnabled}>
              Small Text (14pt)
            </Text>
            <Text style={styles.medium} allowFontScaling={fontScalingEnabled}>
              Medium Text (16pt)
            </Text>
            <Text style={styles.large} allowFontScaling={fontScalingEnabled}>
              Large Text (18pt)
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle} allowFontScaling={false}>
            How to Change System Font Size
          </Text>
          <Text style={styles.infoText} allowFontScaling={false}>
            {Platform.OS === "ios"
              ? "Go to Settings → Display & Brightness → Text Size"
              : "Go to Settings → Display → Font size"}
          </Text>
          <Text
            style={[styles.link, styles.infoText]}
            onPress={openSystemSettings}
            allowFontScaling={false}
          >
            Open System Settings
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  setting: {
    marginBottom: 24,
  },
  settingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  demoSection: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  demoText: {
    gap: 8,
  },
  small: {
    fontSize: 14,
    color: "#000000",
  },
  medium: {
    fontSize: 16,
    color: "#000000",
  },
  large: {
    fontSize: 18,
    color: "#000000",
  },
  infoSection: {
    backgroundColor: "#F0F7FF",
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
