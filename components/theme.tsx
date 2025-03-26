import { Switch } from 'react-native';
import { useColorScheme } from 'nativewind';

const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Switch
      value={colorScheme === 'dark'}
      onValueChange={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={colorScheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
    />
  );
};

export default ThemeToggle;