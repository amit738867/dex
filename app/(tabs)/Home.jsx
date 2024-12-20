import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { useThemeStore } from '@/lib/Themes';

export default function Home() {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useThemeStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
            Welcome to ShopSearch
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 20 }}>
            Find the best deals across multiple platforms in one place.
          </Text>
          
          <Text variant="bodyMedium" style={{ marginBottom: 20 }}>
            Current Theme: {isDarkMode ? 'Dark' : 'Light'}
          </Text>
          
          <Button
            mode="contained"
            onPress={toggleTheme}
            style={{ marginBottom: 10 }}
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.featuresCard}>
        <Card.Content>
          <Text variant="titleLarge" style={{ marginBottom: 15 }}>
            Features
          </Text>
          <View style={styles.feature}>
            <Text variant="bodyLarge">✓ Multi-platform Search</Text>
            <Text variant="bodyMedium">Search across multiple shopping platforms</Text>
          </View>
          <View style={styles.feature}>
            <Text variant="bodyLarge">✓ Price Comparison</Text>
            <Text variant="bodyMedium">Compare prices easily</Text>
          </View>
          <View style={styles.feature}>
            <Text variant="bodyLarge">✓ Search History</Text>
            <Text variant="bodyMedium">Keep track of your searches</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  featuresCard: {
    flex: 1,
  },
  feature: {
    marginBottom: 15,
  },
});