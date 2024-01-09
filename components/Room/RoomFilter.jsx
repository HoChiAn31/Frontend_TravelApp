import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, SIZES } from "../../constants/theme";
const RoomFilter = ({ onFilterChange }) => {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCheckInDatePickerVisible, setCheckInDatePickerVisible] =
    useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisible] =
    useState(false);

  const mapNumberOfGuestsToType = (guests) => {
    if (guests === 1) {
      return "one";
    } else if (guests === 2) {
      return ["one", "two"];
    } else if (guests <= 4) {
      return ["one", "two", "three"];
    } else {
      return ["one", "two", "three", "family"];
    }
  };

  const handleFilterChange = () => {
    const type = mapNumberOfGuestsToType(numberOfGuests);
    console.log(type);
    onFilterChange({ type, checkInDate, checkOutDate });
  };

  const showCheckInDatePicker = () => {
    setCheckInDatePickerVisible(true);
  };

  const showCheckOutDatePicker = () => {
    setCheckOutDatePickerVisible(true);
  };

  const hideCheckInDatePicker = () => {
    setCheckInDatePickerVisible(false);
  };

  const hideCheckOutDatePicker = () => {
    setCheckOutDatePickerVisible(false);
  };

  const handleCheckInDateConfirm = (date) => {
    const currentDate = new Date();
    if (date && date < currentDate) {
      // If the selected date is in the past, do not make any changes
      hideCheckInDatePicker();
      return;
    }
    setCheckInDate(date);
    hideCheckInDatePicker();
  };

  const handleCheckOutDateConfirm = (date) => {
    const currentDate = new Date();
    if (date && date < currentDate) {
      // If the selected date is in the past, do not make any changes
      hideCheckOutDatePicker();
      return;
    }
    setCheckOutDate(date);
    hideCheckOutDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.people}>
        <Text style={styles.label}>Số người:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setNumberOfGuests((prevGuests) => Math.max(prevGuests - 1, 1))
            }
          >
            <Text
              style={{
                color: COLORS.bluequantity,
                fontWeight: "bold",
                fontSize: SIZES.large,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={styles.quantityPeople}>{numberOfGuests}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setNumberOfGuests((prevGuests) => Math.min(prevGuests + 1, 15))
            }
          >
            <Text
              style={{
                color: COLORS.bluequantity,
                fontWeight: "bold",
                fontSize: SIZES.large,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <View>
          <Text style={styles.label}>Ngày check-in:</Text>
          <TouchableOpacity onPress={showCheckInDatePicker}>
            <Text>
              {checkInDate ? checkInDate.toLocaleDateString() : "Select date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isCheckInDatePickerVisible}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleCheckInDateConfirm}
            onCancel={hideCheckInDatePicker}
          />
        </View>

        <View>
          <Text style={styles.label}>Ngày check-out:</Text>
          <TouchableOpacity onPress={showCheckOutDatePicker}>
            <Text>
              {checkOutDate ? checkOutDate.toLocaleDateString() : "Select date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isCheckOutDatePickerVisible}
            mode="date"
            minimumDate={checkInDate || new Date()}
            onConfirm={handleCheckOutDateConfirm}
            onCancel={hideCheckOutDatePicker}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={handleFilterChange}
      >
        <Text style={styles.filterButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
  },
  people: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F7F9FA",
    borderRadius: 4,
    alignItems: "center",
  },
  quantityPeople: {
    width: 40,
    paddingVertical: 8,
    marginHorizontal: 12,
    borderColor: "#CDD0D1",
    borderRadius: 4,
    borderWidth: 1,
    textAlign: "center",
  },
  datePicker: {
    width: "100%",
    marginBottom: 16,
  },
  filterButton: {
    padding: 12,
    backgroundColor: "#4caf50",
    alignItems: "center",
    borderRadius: 4,
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RoomFilter;
