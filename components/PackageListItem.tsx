import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "./StatusBadge";

interface PackageListItemProps {
  id: string;
  trackingId: string;
  recipientName: string;
  status: "Pending" | "In Transit" | "Delivered" | "Failed";
  allowFontScaling?: boolean;
}

export const PackageListItem: React.FC<PackageListItemProps> = ({
  id,
  trackingId,
  recipientName,
  status,
  allowFontScaling = true,
}) => {
  return (
    <Link href={`/package/${id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.trackingId} allowFontScaling={allowFontScaling}>
            {trackingId}
          </Text>
          <Text
            style={styles.recipientName}
            allowFontScaling={allowFontScaling}
          >
            {recipientName}
          </Text>
          <StatusBadge status={status} allowFontScaling={allowFontScaling} />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    gap: 8,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
  recipientName: {
    fontSize: 14,
    color: "#666666",
  },
});
