import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { useTimer } from "../../contexts/timer-context";
import Svg, { Circle, G } from "react-native-svg";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { sendNotification } from "../../store/reducers/notifications/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const screenWidth = Dimensions.get("window").width;

const formatTime = (totalSeconds: number) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return { minutes, seconds };
};

export const CustomTimer = () => {
  const { seconds, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  const { id } = useAppSelector((state) => state.authReducer.user);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const dispatch = useAppDispatch();
  const time = formatTime(seconds);

  const handleStart = () => {
    if (!isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const handleReset = () => {
    resetTimer(); // Сброс до 2 минут
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 150,
          borderWidth: 2,
          borderColor: colors.primary,
          marginRight: 15,
          marginBottom: 10,
        }}
      >
        <Text style={styles.timerText} variant="headlineMedium">
          {time.minutes} : {time.seconds}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button labelStyle={{ fontSize: 16 }} onPress={handleStart}>
          {!isRunning ? "Cтарт" : "Cтоп"}
        </Button>
        <Button labelStyle={{ fontSize: 16 }} onPress={handleReset}>
          Cбросить
        </Button>
      </View>
    </View>
  );
};

const createStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    timerText: {
      top: 55,
      left: 25,
      fontWeight: "600",
      color: colors.primary,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "60%",
      // top: 110,
      // left: 48,
      // zIndex: 5
    },
  });
const stylesP = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
