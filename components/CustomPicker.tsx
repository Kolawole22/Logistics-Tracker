import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CustomPickerProps<T> {
  value: T;
  options: T[];
  onChange: (value: T) => void;
  renderOption: (option: T, isSelected: boolean) => React.ReactNode;
  renderValue: (value: T) => React.ReactNode;
}

export function CustomPicker<T>({
  value,
  options,
  onChange,
  renderOption,
  renderValue,
}: CustomPickerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
      );
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsAnimating(false);
  };

  const handleSelect = (option: T) => {
    onChange(option);
    closeModal();
  };

  return (
    <>
      <Pressable style={styles.trigger} onPress={openModal}>
        <View style={styles.valueContainer}>{renderValue(value)}</View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666666"
        />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.optionsContainer,
              isAnimating && styles.optionsContainerVisible,
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Select Status</Text>
              <TouchableOpacity
                onPress={closeModal}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    option === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  {renderOption(option, option === value)}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F7",
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  valueContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    transform: [{ translateY: 1000 }],
  },
  optionsContainerVisible: {
    transform: [{ translateY: 0 }],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "600",
  },
  optionsList: {
    padding: 8,
  },
  option: {
    padding: 12,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#F2F2F7",
  },
});
