import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Package } from "../contexts/PackagesContext";

interface StatCardProps {
  title: string;
  count: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

interface DashboardStatsProps {
  packages: Package[];
  allowFontScaling?: boolean;
}

export function DashboardStats({
  packages,
  allowFontScaling = true,
}: DashboardStatsProps) {
  const stats = {
    "In Transit": {
      count: packages.filter((p) => p.status === "In Transit").length,
      color: "#007AFF",
    },
    Pending: {
      count: packages.filter((p) => p.status === "Pending").length,
      color: "#FFA500",
    },
    Delivered: {
      count: packages.filter((p) => p.status === "Delivered").length,
      color: "#34C759",
    },
    Failed: {
      count: packages.filter((p) => p.status === "Failed").length,
      color: "#FF3B30",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header} allowFontScaling={allowFontScaling}>
        Package Statistics
      </Text>
      <View style={styles.statsGrid}>
        {Object.entries(stats).map(([status, { count, color }]) => (
          <StatCard key={status} title={status} count={count} color={color} />
        ))}
      </View>
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel} allowFontScaling={allowFontScaling}>
          Total Packages
        </Text>
        <Text style={styles.totalCount} allowFontScaling={allowFontScaling}>
          {packages.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000000",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statCount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: "#666666",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  totalCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007AFF",
  },
});
