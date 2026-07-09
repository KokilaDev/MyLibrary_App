import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabs = [
  { name: "home", title: "Home", icon: "home" },
  { name: "books", title: "All Books", icon: "menu-book" },
  { name: "search", title: "Search", icon: "search" },
  { name: "myBooks", title: "My Books", icon: "book" },
  { name: "profile", title: "Profile", icon: "person" },
] as const;

const DashboardLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name={tab.icon}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
};

export default DashboardLayout;