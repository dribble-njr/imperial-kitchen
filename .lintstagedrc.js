export default {
  '*.{js,ts,tsx}': (files) => {
    // 过滤掉配置文件
    const nonConfigFiles = files.filter(
      (file) => !file.endsWith('.config.js') && !file.endsWith('.config.cjs') && !file.includes('eslintrc')
    );

    if (nonConfigFiles.length === 0) return [];

    return [`eslint --fix ${nonConfigFiles.join(' ')}`, `prettier --write ${nonConfigFiles.join(' ')}`];
  }
};
