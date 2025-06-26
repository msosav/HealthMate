import * as React from "react";
import { Text, View, Modal, Pressable, TextInput, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import ExamsService from "../../services/exams";

type NewExamModalProps = {
  visible: boolean;
  onClose: () => void;
};

const NewExamModal: React.FC<NewExamModalProps> = ({ visible, onClose }) => {
  const [name, setName] = React.useState("");
  const [examDate, setExamDate] = React.useState("");
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [file, setFile] = React.useState<any>(null);
  const [analyzeWithAI, setAnalyzeWithAI] = React.useState(false);

  // Function to close the date picker
  const closePickers = () => {
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    try {
      await ExamsService.create({
        name,
        examDate,
        analyzeWithAI,
        file,
      });
    } catch (error) {
      // Optionally handle error (e.g., show a toast)
      console.error("Failed to create exam", error);
    } finally {
      onClose();
      setName("");
      setExamDate("");
      setFile(null);
      setAnalyzeWithAI(false);
    }
  };

  const handlePickFile = async () => {
    closePickers();
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled) {
      setFile(result.assets[0]);
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
                  New exam
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
                placeholder="Name of exam"
                value={name}
                onChangeText={setName}
                onFocus={closePickers}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-tertiary text-primary"
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                className="w-full mb-3"
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <TextInput
                  placeholder="Date of the exam"
                  value={examDate}
                  editable={false}
                  pointerEvents="none"
                  className="border border-gray-200 rounded-lg px-3 py-2 bg-tertiary text-primary"
                  placeholderTextColor="#888"
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={examDate ? new Date(examDate) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  themeVariant="light"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setExamDate(selectedDate.toISOString().split("T")[0]);
                    }
                  }}
                />
              )}
              <TouchableOpacity
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-tertiary flex-row items-center"
                onPress={handlePickFile}
                activeOpacity={0.7}
              >
                <Text className="text-primary">
                  {file ? file.name : "Upload a document (PDF or photo)"}
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center mb-3">
                <Switch
                  value={analyzeWithAI}
                  onValueChange={setAnalyzeWithAI}
                  trackColor={{ false: "#ccc", true: "#4f46e5" }}
                  thumbColor={analyzeWithAI ? "#6366f1" : "#f4f3f4"}
                />
                <Text className="ml-2 text-primary">Analyze with AI</Text>
              </View>
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

export default NewExamModal;
