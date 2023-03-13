import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons"
import { useColorScheme } from 'nativewind';


export default function ProductCard({
    image,
    category,
    title,
    price,
    description,
}) {
    const [count, setCount] = React.useState(1);
    const {colorScheme} = useColorScheme();
    return (
        <View className="w-screen bg-white dark:bg-[#4d523f] rounded-3xl p-5 my-5">
            <View className="bg-white rounded-xl">
                <Image source={{uri: image}} className="w-full h-72" style={{ resizeMode: "contain"}}/>
            </View>

            <View className="mt-5">
                <Text className="text-sm font-medium text-black/60 dark:text-white/70">{category}</Text>

                <Text className="text-lg font-semibold dark:text-white">{title}</Text>

                <View className="flex-row justify-between my-3">
                        <View className="flex-row gap-3 items-center">
                        <AntDesign 
                            name="minuscircleo"
                            size={24}
                            color={colorScheme === "light" ? "black" : "white"}
                            onPress={() => setCount(count - 1)}
                        />

                        <Text className="text-xl dark:text-white">{count}</Text>

                        <AntDesign 
                            name="pluscircleo"
                            size={24}
                            color={colorScheme === "light" ? "black" : "white"}
                            onPress={() => setCount(count + 1)}
                        />

                        </View>
                        <Text numberOfLines={2} className="text-2xl font-extrabold dark:text-white">MYR{price * count}</Text>
                        </View>
                
                <Text className="text-sm text-black/60 dark:text-white/70">{description}</Text>

                <TouchableOpacity className="flex-row justify-center bg-black dark:bg-white p-3 rounded-full w-10/12 mt-5 self-center">
                            <Text className="text-white dark:text-black font-bold"> Add To Cart</Text>
                </TouchableOpacity>
            </View>
        

        </View>
      )
}