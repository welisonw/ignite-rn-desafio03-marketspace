import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { Center, Text, VStack } from "native-base";

export const Home = () => {
  return (
    <VStack flex={1} paddingTop={16} px={6} backgroundColor='gray.200'>
      <HomeHeader />
    </VStack>
  );
};
