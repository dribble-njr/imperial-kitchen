import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Appbar, AppbarProps } from 'react-native-paper';

interface StackHeaderProps extends AppbarProps {
  navProps: NativeStackHeaderProps;
}

const StackHeader: FC<StackHeaderProps> = ({ navProps, ...props }) => (
  <Appbar.Header {...props}>
    {navProps.options.headerLeft
      ? navProps.options.headerLeft({
          canGoBack: navProps.navigation.canGoBack()
        })
      : undefined}

    {navProps.back ? <Appbar.BackAction onPress={navProps.navigation.goBack} /> : null}

    <Appbar.Content title={getHeaderTitle(navProps.options, navProps.route.name)} />

    {navProps.options.headerRight
      ? navProps.options.headerRight({
          canGoBack: navProps.navigation.canGoBack()
        })
      : undefined}
  </Appbar.Header>
);

export default StackHeader;
