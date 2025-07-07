import { StatusBadge } from "@/components/StatusBadge";
import { usePackages } from "@/contexts/PackagesContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PackageDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { packages } = usePackages();

  const package_ = packages.find((p) => p.id === id);

  if (!package_) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Package not found</Text>
      </View>
    );
  }

  const handleUpdateStatus = () => {
    router.push({
      pathname: "/update-status/[id]",
      params: { id: package_.id },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.trackingId}>#{package_.trackingId}</Text>
          <StatusBadge status={package_.status} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Recipient Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Name</Text>
            <Text style={styles.body}>{package_.recipientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Phone</Text>
            <Text style={styles.body}>{package_.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Delivery Address</Text>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Address</Text>
            <Text style={styles.body}>{package_.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>City</Text>
            <Text style={styles.body}>{package_.city}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Country</Text>
            <Text style={styles.body}>{package_.country}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Last Updated</Text>
          <View style={styles.infoRow}>
            <Text style={styles.subtitle}>Date</Text>
            <Text style={styles.body}>
              {new Date(package_.lastUpdated).toLocaleString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            {/* <Text style={styles.subtitle}>Time</Text> */}
            {/* <Text style={styles.body}>
              {new Date(package_.lastUpdated).toLocaleTimeString()}
            </Text> */}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateStatus}
      >
        <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Update Status</Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },
  body: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 8,
  },
  trackingId: {
    color: "#007AFF",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  updateButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  error: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    margin: 16,
  },
});
