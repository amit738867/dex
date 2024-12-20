import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { 
  List, 
  Switch, 
  Divider, 
  useTheme,
 
} from 'react-native-paper';
import useSearchStore from '@/lib/MainStore';

export default function Settings() {
  const theme = useTheme();
  const { clearHistory } = useSearchStore();
  

  const [notifications, setNotifications] = React.useState(false);
  const [emailUpdates, setEmailUpdates] = React.useState(false);
  const [priceAlerts, setPriceAlerts] = React.useState(false);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
     
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Push Notifications"
          description="Receive updates and alerts on your device"
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Email Updates"
          description="Get updates via email"
          right={() => (
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Price Alerts"
          description="Get notified when prices drop"
          right={() => (
            <Switch
              value={priceAlerts}
              onValueChange={setPriceAlerts}
              color={theme.colors.primary}
            />
          )}
        />
      </List.Section>


      <List.Section>
        <List.Subheader>Data Management</List.Subheader>
        <List.Item
          title="Clear Search History"
          description="Remove all your previous searches"
          onPress={clearHistory}
          right={props => <List.Icon {...props} icon="delete" />}
        />
        <Divider />
        <List.Item
          title="Download Data"
          description="Export your search history"
          onPress={() => {}}
          right={props => <List.Icon {...props} icon="download" />}
        />
      </List.Section>


      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
          right={props => <List.Icon {...props} icon="information" />}
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          onPress={() => {}}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          onPress={() => {}}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Contact Support"
          onPress={() => {}}
          right={props => <List.Icon {...props} icon="email" />}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  themeContainer: {
    alignItems: 'center',
  },
  themeText: {
    marginBottom: 12,
  },
  themeButton: {
    width: '100%',
  },
});