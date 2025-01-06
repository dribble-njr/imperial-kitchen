import { List as PaperList, ListItemProps as PaperListItemProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Text from './Text';
import Surface from './Surface';

interface ListItemProps extends PaperListItemProps {
  hasRightIcon?: boolean;
  rightText?: string;
}

export const ListItem = ({ style, hasRightIcon = true, rightText, ...rest }: ListItemProps) => {
  return (
    <PaperList.Item
      style={[style, { padding: 0 }]}
      {...rest}
      testID="list-item"
      right={(props) => {
        if (!hasRightIcon) return null;

        return (
          <Surface elevation={0} {...props} style={[styles.rightContainer, props.style]}>
            {rightText ? <Text type="secondary">{rightText}</Text> : null}
            <PaperList.Icon {...props} style={[props.style, { marginRight: -12 }]} icon="chevron-right" />
          </Surface>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
