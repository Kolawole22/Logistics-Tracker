import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Status = "Pending" | "In Transit" | "Delivered" | "Failed";

interface StatusBadgeProps {
  status: Status;
  allowFontScaling?: boolean;
}

const statusColors = {
  Pending: "#FFA500",
  "In Transit": "#007AFF",
  Delivered: "#34C759",
  Failed: "#FF3B30",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  allowFontScaling = true,
}) => {
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <Text style={styles.text} allowFontScaling={allowFontScaling}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
