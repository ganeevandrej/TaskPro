import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTimer } from "../../contexts/timer-context";

export const CustomTimer = () => {
  const { seconds, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return { minutes, seconds };
  };

  const timer = formatTime(seconds);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timer.minutes}s</Text>
      <Text style={styles.timerText}>{timer.seconds}s</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} disabled={isRunning} />
        <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  timerText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

export default CustomTimer;
