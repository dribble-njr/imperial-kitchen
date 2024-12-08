import CloseMenuIcon from '@/assets/icons/close-menu-icon.svg';
import OpenMenuIcon from '@/assets/icons/open-menu-icon.svg';
import { SidebarConfig, SidebarItemType } from '@/types';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const ANIMATE_DURATION = 400;

const SideBarItem = ({
  config,
  isActive,
  onSelect,
  isFirst,
  isLast
}: {
  config: SidebarConfig;
  isActive: boolean;
  onSelect: (key: SidebarItemType) => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const { icon: Icon, type } = config;

  return (
    <View
      style={[
        styles.sidebarItem,
        isFirst && styles.roundedTop,
        isLast && styles.roundedBottom,
        isActive && styles.activeItem
      ]}
      onTouchStart={() => onSelect(type)}
    >
      <Icon width={32} height={32} />
    </View>
  );
};

const ToggleMenuButton = ({ showMenu, setShowMenu }: { showMenu: boolean; setShowMenu: (show: boolean) => void }) => {
  const [delayShowMenu, setDelayShowMenu] = useState(showMenu);
  const progress = useSharedValue(showMenu ? 0 : 1);

  useEffect(() => {
    progress.value = withTiming(showMenu ? 0 : 1, {
      duration: ANIMATE_DURATION
    });
    const timeout = setTimeout(() => {
      setDelayShowMenu(showMenu);
    }, ANIMATE_DURATION / 2);

    return () => {
      clearTimeout(timeout);
    };
  }, [showMenu]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 360], Extrapolation.CLAMP);

    const backgroundColor = interpolate(
      progress.value,
      [0, 1],
      [255, 238] // 白色到浅灰色的插值
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotate}deg` }],
      backgroundColor: `rgb(${backgroundColor}, ${backgroundColor}, ${backgroundColor})`,
      backfaceVisibility: 'hidden'
    };
  }, [progress]);

  const Icon = delayShowMenu ? OpenMenuIcon : CloseMenuIcon;

  return (
    <Animated.View style={[styles.toggleButton, animatedStyle]} onTouchStart={() => setShowMenu(!showMenu)}>
      <Icon width={32} height={32} />
    </Animated.View>
  );
};

export default function SideBar({
  configs,
  selectedKey,
  onSelect
}: {
  configs: SidebarConfig[];
  selectedKey: string;
  onSelect: (key: SidebarItemType) => void;
}) {
  const [showMenu, setShowMenu] = useState(true);
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(showMenu ? 1 : 0, {
      duration: ANIMATE_DURATION
    });
  }, [showMenu]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: opacity.value === 0 ? 'none' : 'auto'
  }));

  const sidebarItems = configs.reduce<{
    top: SidebarConfig[];
    center: SidebarConfig[];
    bottom: SidebarConfig[];
  }>(
    (acc, config) => {
      acc[config.position || 'center'].push(config);
      return acc;
    },
    { top: [], center: [], bottom: [] }
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebarContent, animatedStyle]}>
        {Object.values(sidebarItems).map((items, index) => (
          <View key={index} style={[styles.itemsGroup, !!items.length && styles.itemsGroupBg]}>
            {items.map((config, idx) => (
              <SideBarItem
                key={config.type}
                config={config}
                isActive={selectedKey === config.type}
                onSelect={onSelect}
                isFirst={idx === 0}
                isLast={idx === items.length - 1}
              />
            ))}
          </View>
        ))}
      </Animated.View>

      <View style={styles.toggleButtonContainer}>
        <ToggleMenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10
  },
  sidebarContent: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemsGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginVertical: 12,
    borderRadius: 16
  },
  itemsGroupBg: {
    backgroundColor: '#eef2f9'
  },
  sidebarItem: {
    padding: 10
  },
  roundedTop: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  roundedBottom: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  activeItem: {
    backgroundColor: '#fff'
  },
  toggleButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 12,
    borderRadius: 16
  },
  toggleButton: {
    padding: 12,
    borderRadius: 44
  }
});
