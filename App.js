import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; // ใช้ไอคอน

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=13.7563&longitude=100.5018&hourly=temperature_2m,weathercode&timezone=Asia/Bangkok";

// 📌 Home Screen (แสดงสภาพอากาศ)
const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
  
        const formattedData = data.hourly.time.map((time, index) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
          weatherCode: data.hourly.weathercode[index],
        }));
  
        setWeatherData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  // ฟังก์ชันเมื่อกดปุ่ม
  const handlePress = (item) => {
    Alert.alert(
      "🌦 รายละเอียดสภาพอากาศ",
      `⏰ เวลา: ${item.time}\n🌡 อุณหภูมิ: ${item.temperature} °C\n🌦 รหัสสภาพอากาศ: ${item.weatherCode}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={weatherData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>เวลา: {item.time}</Text>
              <Text style={styles.text}>อุณหภูมิ: {item.temperature} °C</Text>
              <Text style={styles.text}>รหัสสภาพอากาศ: {item.weatherCode}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.buttonText}>🔍 ดูรายละเอียด</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

// 📌 Settings Screen (หน้าการตั้งค่า)
const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>⚙️ การตั้งค่า</Text>
    </SafeAreaView>
  );
};

// สร้าง Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// 📌 Main App (จัดการ Navigation)
export default function App() {
  const [fontsLoaded] = useFonts({
    "Kanit-Regular" : require("./assets/fonts/Kanit-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null; // รอโหลดฟอนต์ก่อนแสดง UI
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Weather") {
              iconName = "partly-sunny-outline"; // ไอคอนหน้าหลัก
            } else if (route.name === "Settings") {
              iconName = "settings-outline"; // ไอคอนหน้า Settings
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato", // สีปุ่มเมื่อถูกเลือก
          tabBarInactiveTintColor: "gray", // สีปุ่มเมื่อไม่ได้เลือก
        })}
      >
        <Tab.Screen name="Weather" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
