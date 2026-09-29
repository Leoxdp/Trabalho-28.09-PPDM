import {Products} from "./src/screens/Products/index"
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Products />
    </SafeAreaProvider>
  );
}