import * as React from "react";
import { Text, View, Modal, Pressable, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import CrisesService from "@/app/services/crises";

type NewCrisisModalProps = {
  visible: boolean;
  onClose: () => void;
};

const NewCrisisModal: React.FC<
  NewCrisisModalProps & { onCreated?: () => void }
> = ({ visible, onClose, onCreated }) => {
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [showStartDatePicker, setStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setEndDatePicker] = React.useState(false);

  // Add local state for pickers
  const [pickerStartDate, setPickerStartDate] = React.useState<Date | null>(
    null
  );
  const [pickerEndDate, setPickerEndDate] = React.useState<Date | null>(null);

  // Function to close both pickers
  const closePickers = () => {
    setStartDatePicker(false);
    setEndDatePicker(false);
  };

  const handleSave = async () => {
    try {
      await CrisesService.create({
        name,
        start_date: startDate,
        end_date: endDate,
        comments,
      });
      if (onCreated) onCreated();
    } catch (e) {
      // Optionally handle error
    }
    onClose();
    setName("");
    setStartDate("");
    setEndDate("");
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
        <BlurView intensity={20} tint="prominent" className="flex-1">
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl text-primary font-bold">
                  New crisis
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
                placeholder="Crisis name"
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
                    setPickerStartDate(
                      startDate ? new Date(startDate) : new Date()
                    );
                    setStartDatePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <TextInput
                    placeholder="Start date"
                    value={startDate}
                    editable={false}
                    pointerEvents="none"
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-tertiary text-primary"
                    placeholderTextColor="#888"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1"
                  onPress={() => {
                    setPickerEndDate(endDate ? new Date(endDate) : new Date());
                    setEndDatePicker(true);
                  }}
                  activeOpacity={0.7}
                >
                  <TextInput
                    placeholder="End date"
                    value={endDate}
                    editable={false}
                    pointerEvents="none"
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-tertiary text-primary"
                    placeholderTextColor="#888"
                  />
                </TouchableOpacity>
              </View>
              {showStartDatePicker && (
                <DateTimePicker
                  value={
                    pickerStartDate ||
                    (startDate ? new Date(startDate) : new Date())
                  }
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  themeVariant="light"
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setPickerStartDate(selectedDate);
                      setStartDate(selectedDate.toISOString().split("T")[0]);
                      setStartDatePicker(false);
                    } else {
                      setStartDatePicker(false);
                    }
                  }}
                />
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  value={
                    pickerEndDate || (endDate ? new Date(endDate) : new Date())
                  }
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  themeVariant="light"
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setPickerEndDate(selectedDate);
                      setEndDate(selectedDate.toISOString().split("T")[0]);
                      setEndDatePicker(false);
                    } else {
                      setEndDatePicker(false);
                    }
                  }}
                />
              )}
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

export default NewCrisisModal;
