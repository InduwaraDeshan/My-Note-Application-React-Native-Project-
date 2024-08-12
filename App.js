import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginUi } from "./Login";
import { HomeUi } from "./Home";
import { SignUpUi } from "./SignUp";
import { NoteUi } from "./Note";
import { NoteListUi } from "./NoteList";

const Stack = createNativeStackNavigator();

function app() {


  async function checkUser() {
    const mobile = await AsyncStorage.getItem('mobile');   
    return mobile;
     }
  

  const ui = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={checkUser != null?"NoteList":"SignUp"}>
        <Stack.Screen name="Home" component={HomeUi} />
        <Stack.Screen name="Login" component={LoginUi} />
        <Stack.Screen name="SignUp" component={SignUpUi} />
        <Stack.Screen name="Note" component={NoteUi} />
        <Stack.Screen name="NoteList" component={NoteListUi} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}

export default app;
