import {LinearGradient} from "expo-linear-gradient";
import React from "react";

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={["#9b59b6", "#8e44ad", "#6a1b9a"]}
    style={styles.gradientBackground}
  >
    {children}
  </LinearGradient>
);

const styles = {
  gradientBackground: {
    flex: 1
  },
};

export default GradientBackground;
