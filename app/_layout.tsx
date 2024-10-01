import { Stack } from "expo-router";

export default function RootLayout() {
  
  return (
    <Stack screenOptions={{
      headerShown:true,
      headerTitle:'',
      headerTransparent:true
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
