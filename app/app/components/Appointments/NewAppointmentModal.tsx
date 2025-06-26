import * as React from "react";
import { Text, View, Modal, Pressable, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import AppointmentsService from "../../services/appointments";

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
  const [tempDate, setTempDate] = React.useState<string>("");
  const [tempTime, setTempTime] = React.useState<string>("");

  // Function to close both pickers
  const closePickers = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleSave = async () => {
    // Format time as HH:mm:00
    const formattedTime = time
      ? `${time.length === 5 ? time : time + ":00"}`
      : "";
    const appointmentData = {
      name,
      date,
      time: formattedTime,
      address,
      comments,
    };
    try {
      await AppointmentsService.create(appointmentData);
      onClose();
      setName("");
      setDate("");
      setTime("");
      setAddress("");
      setComments("");
    } catch (error) {
      console.error("Failed to create appointment", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <BlurView intensity={20} tint="prominent" className="flex-1">
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
                    setTempDate(date || new Date().toISOString().split("T")[0]);
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
                    setTempTime(time || "");
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
                <View>
                  <DateTimePicker
                    value={tempDate ? new Date(tempDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    themeVariant="light"
                    onChange={(_, selectedDate) => {
                      if (Platform.OS === "ios") {
                        if (selectedDate) {
                          setTempDate(selectedDate.toISOString().split("T")[0]);
                        }
                      } else {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          setDate(selectedDate.toISOString().split("T")[0]);
                        }
                      }
                    }}
                  />
                  {Platform.OS === "ios" && (
                    <View className="flex-row justify-center mt-2 py-2">
                      <Pressable
                        onPress={() => {
                          setShowDatePicker(false);
                          setDate(tempDate);
                        }}
                        className="bg-primary rounded-lg px-3 py-2 text-center"
                      >
                        <Text className="text-white font-bold text-center">
                          Done
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              )}
              {showTimePicker && (
                <View>
                  <DateTimePicker
                    value={
                      tempTime
                        ? new Date(`1970-01-01T${tempTime || "00:00"}:00`)
                        : new Date()
                    }
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    themeVariant="light"
                    onChange={(_, selectedTime) => {
                      if (Platform.OS === "ios") {
                        if (selectedTime) {
                          const hours = selectedTime
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = selectedTime
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          setTempTime(`${hours}:${minutes}`);
                        }
                      } else {
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
                      }
                    }}
                  />
                  {Platform.OS === "ios" && (
                    <View className="flex-row justify-center mt-2 py-2">
                      <Pressable
                        onPress={() => {
                          setShowTimePicker(false);
                          setTime(tempTime);
                        }}
                        className="bg-primary rounded-lg px-3 py-2 text-center"
                      >
                        <Text className="text-white font-bold text-center">
                          Done
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
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
