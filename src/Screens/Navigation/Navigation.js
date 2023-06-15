import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../RegistrationScreen/RegistrationScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import Home from '../Home/Home';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

import PostsNav from './PostsNav';
import PostList from '../../Elements/PostList';
import CommentsScreen from '../CommentsScreen/CommentsScreen';
import Map from '../../Elements/Map';
const MainStack = createStackNavigator();

const Navigation = () => {
  return (
    <MainStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <MainStack.Screen name='Login' component={LoginScreen} />
      <MainStack.Screen name='Registratione' component={RegistrationScreen} />
      <MainStack.Screen name='Home' component={Home} />
      <MainStack.Screen name='PostsNav' component={PostsNav} />
      <MainStack.Screen name='ProfileScreen' component={ProfileScreen} />
      <MainStack.Screen name='PostList' component={PostList} />
      <MainStack.Screen name='CommentsScreen' component={CommentsScreen} />
      <MainStack.Screen name='Map' component={Map} />

    </MainStack.Navigator>
  );
};

export default Navigation;