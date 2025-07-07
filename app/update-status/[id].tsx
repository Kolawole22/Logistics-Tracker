import { StatusBadge } from "@/components/StatusBadge";
import { Text } from "@/components/Text";
import { Status, usePackages } from "@/contexts/PackagesContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const statusOptions: Status[] = [
  "Pending",
  "In Transit",
  "Delivered",
  "Failed",
];

export default function UpdateStatus() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { packages, updatePackageStatus, isLoading } = usePackages();

  const package_ = packages.find((p) => p.id === id);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    package_?.status || null
  );

  if (!package_) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Package not found</Text>
      </View>
    );
  }

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;

    await updatePackageStatus(package_.id, selectedStatus);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.packageInfo}>
        <Text style={styles.label}>Tracking ID</Text>
        <Text style={styles.value}>#{package_.trackingId}</Text>

        <Text style={styles.label}>Current Status</Text>
        <StatusBadge status={package_.status} />
      </View>

      <View style={styles.statusOptions}>
        <Text style={styles.sectionTitle}>Select New Status</Text>
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusOption,
              selectedStatus === status && styles.selectedOption,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <StatusBadge status={status} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.updateButton,
          (!selectedStatus || selectedStatus === package_.status) &&
            styles.disabledButton,
        ]}
        onPress={handleUpdateStatus}
        disabled={
          !selectedStatus || selectedStatus === package_.status || isLoading
        }
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Update Status</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  packageInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  statusOptions: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F8F8F8",
  },
  selectedOption: {
    backgroundColor: "#E8F1FF",
  },
  updateButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
  },
});
