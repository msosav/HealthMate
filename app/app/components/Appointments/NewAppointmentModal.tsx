import * as React from "react";
import { Text, View, Modal, Pressable, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

type NewAppointmentModalProps = {
  visible: boolean;
  onClose: () => void;
};

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  visible,
  onClose,
}) => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  // Function to close both pickers
  const closePickers = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleSave = () => {
    // Save logic here
    onClose();
    setName("");
    setDate("");
    setTime("");
    setAddress("");
    setComments("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <BlurView intensity={20} tint="light" className="flex-1">
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl text-primary font-bold">
                  New appointment
                </Text>
                <Pressable
                  onPress={() => {
                    closePickers();
                    onClose();
                  }}
                  hitSlop={10}
                  className="ml-2"
                >
                  <Text className="text-2xl text-primary font-bold">×</Text>
                </Pressable>
              </View>
              <TextInput
                placeholder="Appointment name"
                value={name}
                onChangeText={setName}
                onFocus={closePickers}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-tertiary text-primary"
                placeholderTextColor="#888"
              />
              <View className="flex-row w-full space-x-2 mb-3 gap-3">
                <TouchableOpacity
                  className="flex-1"
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <TextInput
                    placeholder="Date"
                    value={date}
                    editable={false}
                    pointerEvents="none"
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-tertiary text-primary"
                    placeholderTextColor="#888"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1"
                  onPress={() => {
                    setShowTimePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <TextInput
                    placeholder="Time"
                    value={time}
                    editable={false}
                    pointerEvents="none"
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-tertiary text-primary"
                    placeholderTextColor="#888"
                  />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={date ? new Date(date) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  themeVariant="light"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate.toISOString().split("T")[0]);
                    }
                  }}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={time ? new Date(`1970-01-01T${time}:00`) : new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  themeVariant="light"
                  onChange={(_, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      const hours = selectedTime
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                      const minutes = selectedTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      setTime(`${hours}:${minutes}`);
                    }
                  }}
                />
              )}
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                onFocus={closePickers}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-tertiary text-primary"
                placeholderTextColor="#888"
              />
              <TextInput
                placeholder="Comments"
                value={comments}
                onChangeText={setComments}
                onFocus={closePickers}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-tertiary text-primary"
                placeholderTextColor="#888"
                multiline
              />
              <View className="items-center">
                <Pressable
                  onPress={() => {
                    closePickers();
                    handleSave();
                  }}
                  className="bg-primary text-white w-1/4 rounded-lg py-2 px-6 mt-2"
                >
                  <Text className="text-white font-bold text-center">Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default NewAppointmentModal;
