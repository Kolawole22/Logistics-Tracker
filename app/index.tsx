import { DashboardStats } from "@/components/DashboardStats";
import { StatusBadge } from "@/components/StatusBadge";
import { Text } from "@/components/Text";
import { FontScalingContext } from "@/contexts/FontScalingContext";
import { Package, PackagesContext } from "@/contexts/PackagesContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const { fontScalingEnabled } = useContext(FontScalingContext);
  const { packages, isLoading, refreshPackages } = useContext(PackagesContext);

  const renderItem = ({ item }: { item: Package }) => (
    <Link href={`/package/${item.id}`} asChild>
      <TouchableOpacity style={styles.packageItem}>
        <View style={styles.packageHeader}>
          <Text style={styles.trackingId}>#{item.trackingId}</Text>
          <StatusBadge
            status={item.status}
            allowFontScaling={fontScalingEnabled}
          />
        </View>
        <Text style={styles.recipientName}>{item.recipientName}</Text>
        <Text style={styles.date}>
          Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshPackages} />
        }
        ListHeaderComponent={
          <DashboardStats
            packages={packages}
            allowFontScaling={fontScalingEnabled}
          />
        }
        contentContainerStyle={styles.listContent}
      />
      <Link href="/settings" asChild>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  listContent: {
    paddingBottom: 80,
  },
  packageItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  settingsButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
