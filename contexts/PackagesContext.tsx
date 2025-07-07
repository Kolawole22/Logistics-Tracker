import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "react-native-toast-message";

export type Status = "Pending" | "In Transit" | "Delivered" | "Failed";

export interface Package {
  id: string;
  trackingId: string;
  recipientName: string;
  status: Status;
  lastUpdated: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

interface PackagesContextType {
  packages: Package[];
  isLoading: boolean;
  refreshPackages: () => Promise<void>;
  updatePackageStatus: (id: string, newStatus: Status) => Promise<void>;
}

export const PackagesContext = createContext<PackagesContextType>({
  packages: [],
  isLoading: false,
  refreshPackages: async () => {},
  updatePackageStatus: async () => {},
});

// Mock data
const mockPackages: Package[] = [
  {
    id: "1",
    trackingId: "TRK123456",
    recipientName: "John Doe",
    status: "In Transit",
    lastUpdated: new Date().toISOString(),
    address: "123 Main St",
    city: "New York",
    country: "USA",
    phone: "+1 234-567-8900",
  },
  {
    id: "2",
    trackingId: "TRK789012",
    recipientName: "Jane Smith",
    status: "Pending",
    lastUpdated: new Date().toISOString(),
    address: "456 Oak Ave",
    city: "Los Angeles",
    country: "USA",
    phone: "+1 234-567-8901",
  },
  {
    id: "3",
    trackingId: "TRK345678",
    recipientName: "Bob Johnson",
    status: "Delivered",
    lastUpdated: new Date().toISOString(),
    address: "789 Pine Rd",
    city: "Chicago",
    country: "USA",
    phone: "+1 234-567-8902",
  },
  {
    id: "4",
    trackingId: "TRK901234",
    recipientName: "Alice Brown",
    status: "Failed",
    lastUpdated: new Date().toISOString(),
    address: "321 Elm St",
    city: "Houston",
    country: "USA",
    phone: "+1 234-567-8903",
  },
];

export function PackagesProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPackages = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPackages(mockPackages);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to refresh packages",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePackageStatus = useCallback(
    async (id: string, newStatus: Status) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPackages((prev) =>
          prev.map((pkg) =>
            pkg.id === id
              ? {
                  ...pkg,
                  status: newStatus,
                  lastUpdated: new Date().toISOString(),
                }
              : pkg
          )
        );
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Package status updated",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update package status",
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <PackagesContext.Provider
      value={{
        packages,
        isLoading,
        refreshPackages,
        updatePackageStatus,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

export const usePackages = () => useContext(PackagesContext);
