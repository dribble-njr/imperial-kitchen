import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { SidebarConfig, SidebarItemType } from '../types';

const SideBarItem = ({
  config,
  isActive,
  onSelect
}: {
  config: SidebarConfig;
  isActive: boolean;
  onSelect: (key: SidebarItemType) => void;
}) => {
  const { icon: Icon, type, onSelect: _onSelect } = config;
  return (
    <View
      className={`flex flex-row items-center gap-2 p-2 m-1 rounded-lg ${isActive ? 'bg-[#f0eee9]' : ''}`}
      onTouchStart={() => {
        onSelect(type);
        _onSelect?.();
      }}
    >
      <Icon width={32} height={32} />
    </View>
  );
};

export const SideBar = ({
  configs,
  selectedKey,
  onSelect
}: {
  configs: SidebarConfig[];
  selectedKey: string;
  onSelect: (key: SidebarItemType) => void;
}) => {
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
    <ThemedView className="w-1/6 h-full flex flex-col justify-between py-8">
      {Object.values(sidebarItems).map((items, index) => (
        <View key={index} className="flex flex-col items-center">
          {items.map((config) => (
            <SideBarItem key={config.type} config={config} isActive={selectedKey === config.type} onSelect={onSelect} />
          ))}
        </View>
      ))}
    </ThemedView>
  );
};
