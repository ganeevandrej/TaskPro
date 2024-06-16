import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { useTimer } from "../../contexts/timer-context";
import Svg, { Circle, G } from "react-native-svg";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const screenWidth = Dimensions.get("window").width;

const formatTime = (totalSeconds: number) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return { minutes, seconds };
};

export const CustomTimer = () => {
  const { seconds, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  const [progress, setProgress] = useState(1);
  const progressRef = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const timer = formatTime(seconds);

  useEffect(useCallback(() => {
    if (isRunning) {
      Animated.timing(progressRef, {
        toValue: progress,
        duration: seconds * 1000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          handleFinish();
        }
      });
    } else {
      progressRef.stopAnimation();
    }
  }, [progress, isRunning]), [isRunning]);

  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const handleStart = () => {
    if (!isRunning) {
      setProgress(0);
      startTimer();
    } else {
      stopTimer();
    }
  };

  const handleReset = () => {
    stopTimer();
    setProgress(1);
    resetTimer(); // Сброс до 2 минут
    progressRef.setValue(1);
  };

  const handleFinish = () => {
    handleReset();
  };

  return (
    <View style={styles.container}>
      <View>
        <Svg height="225" width="225" viewBox="0 0 126 126">
          <G rotation="-90" origin="126, 126">
            <Circle cx="195" cy="63" r={circleRadius} fill="transparent" />
            <AnimatedCircle
              stroke={colors.primary}
              cx="195"
              cy="63"
              r={circleRadius}
              strokeWidth="1"
              fill="none"
              strokeDasharray={circleCircumference}
              strokeDashoffset={progressRef.interpolate({
                inputRange: [0, 1],
                outputRange: [circleCircumference, 0],
              })}
            />
          </G>
          <Text style={styles.timerText}>
            {timer.minutes}m : {timer.seconds}s
          </Text>
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          // textColor={colors.error}
          labelStyle={{ fontSize: 16 }}
          onPress={handleStart}
        >
          {!isRunning ? "Старт" : "Стоп"}
        </Button>
        {/* <Button onPress={handleStop} disabled={!isRunning}>
          Stop
        </Button> */}
        <Button
          // style={{ marginLeft: 15 }}
          // textColor={colors.error}
          labelStyle={{ fontSize: 16 }}
          onPress={handleReset}
        >
          Сбросить
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
      fontSize: 28,
      top: 80,
      left: 40,
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
