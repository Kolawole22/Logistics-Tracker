import { FontScalingContext } from "@/contexts/FontScalingContext";
import React, { useContext } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  forceScaling?: boolean;
}

export function Text({ style, forceScaling = true, ...props }: TextProps) {
  const { fontScalingEnabled } = useContext(FontScalingContext);

  return (
    <RNText
      {...props}
      allowFontScaling={forceScaling && fontScalingEnabled}
      style={[style]}
    />
  );
}
