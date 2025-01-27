import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import Surface from './Surface';

interface DigitInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  cellSize?: number;
}

export default function DigitInput({ value, onChange, length = 6, cellSize = 40 }: DigitInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const digits = value.split('');
  const filledCells = digits.length;
  const cells = Array(length).fill(0);

  const startCursorBlink = () => {
    // 清除之前的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setShowCursor(true);
    intervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
  };

  const stopCursorBlink = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setShowCursor(false);
  };

  useEffect(() => {
    if (focused) {
      startCursorBlink();
    } else {
      stopCursorBlink();
    }

    return stopCursorBlink;
  }, [focused, value]); // value 长度变化也需要重新开始闪烁

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(text) => {
            // 只允许输入数字
            const numbers = text.replace(/[^0-9]/g, '');
            if (numbers.length <= length) {
              onChange(numbers);
            }
          }}
          keyboardType="number-pad"
          maxLength={length}
          style={[styles.hiddenInput, StyleSheet.absoluteFill]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          caretHidden={true}
          contextMenuHidden={true}
        />
        <View style={styles.cellsContainer}>
          {cells.map((_, index) => (
            <Surface
              key={index}
              style={[
                styles.cell,
                { width: cellSize, height: cellSize },
                focused && filledCells === index && styles.cellFocused,
                digits[index] && styles.cellFilled
              ]}
              pointerEvents="none"
            >
              <Text style={styles.digit}>{digits[index] || ''}</Text>
              {focused && filledCells === index && filledCells < length && showCursor && <View style={styles.cursor} />}
            </Surface>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    backgroundColor: 'transparent'
  },
  cellsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent'
  },
  hiddenInput: {
    opacity: 0,
    fontSize: 1
  },
  cell: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellFocused: {
    borderBottomColor: '#f87170'
  },
  cellFilled: {
    borderBottomColor: '#254BE7'
  },
  digit: {
    fontSize: 20,
    color: '#254BE7'
  },
  cursor: {
    position: 'absolute',
    width: 1,
    height: 24,
    backgroundColor: '#f87170'
  }
});
