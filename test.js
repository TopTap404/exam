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
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; // ใช้ไอคอน

const API_KEY = "https://api.open-meteo.com/v1/forecast?latitude=13.7563&longitude=100.5018&hourly=temperature_2m,weathercode&timezone=Asia/Bangkok";

const home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [fontLoaded, setFontLoaded] = useState([false]);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Bold": require("./assets/fonts/Kanit-Regular.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    fetch(API_KEY)
    .then((response) => response.json)
    .then((data)=>{
        const formatdata = data.hour
    })
  },[])
};
