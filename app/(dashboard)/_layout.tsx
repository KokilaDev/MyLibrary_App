import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

const tabs = [
  { name: "home", title: "Home", icon: "home" },
  { name: "books", title: "All Books", icon: "menu-book" },
  { name: "search", title: "Search", icon: "search" },
  { name: "myBooks", title: "My Books", icon: "book" },
  { name: "profile", title: "Profile", icon: "person" },
] as const;

const AnimatedTabButton = ({ 
  tab, 
  focused, 
  onPress 
}: any) => {
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(
        focused ? 95 : 45,
      )
    }
  });

  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center"
    >
      <Animated.View
        style={[
          {
            height: 40,
            borderRadius: 25,
            backgroundColor: focused ? '#f2f2f2' : 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
          animatedStyle
        ]}
      >
        <MaterialIcons 
          name={tab.icon}
          size={22}
          color={focused ? '#1a181b' : '#cccccc'}
        />
        {focused && (
          <Text 
            className="ml-2 text-[#1a181b] text-xs font-bold"
            numberOfLines={1}
          >
            {tab.title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  )
}

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 70,
            backgroundColor: "#1A181B",
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between", 
            paddingHorizontal: 15,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const tab = tabs.find((t) => t.name === route.name);
            if (!tab) return null;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <AnimatedTabButton
                key={route.key}
                tab={tab}
                focused={isFocused}
                onPress={onPress}
              />
            );
          })}
        </View>
      )}
    />
  );
};

export default DashboardLayout;