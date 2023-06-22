const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable experimental symlink support for pnpm
config.resolver.unstable_enableSymlinks = true;

// These can't be found from the project root, it has to be resolved from `react-native` or `metro-config`
config.transformer.asyncRequireModulePath = resolveInOrder('react-native', 'metro-runtime/src/modules/asyncRequire');
// These can't be found either, but do not cause a crash immediately (probably because they are used later)
config.transformerPath = resolveInOrder('react-native', 'metro-transform-worker');
config.transformer.minifierPath = resolveInOrder('react-native', 'metro-minify-terser');
config.transformer.workerPath = resolveInOrder('react-native', 'metro/src/DeltaBundler/Worker');

/** Resolve modules in a chain, using the location of the previous module for the next resolve step */
function resolveInOrder(...moduleNames) {
  return moduleNames.reduce((cwd, moduleName) => {
    return !cwd
      ? require.resolve(moduleName)
      : require.resolve(moduleName, { paths: [cwd] });
  });
}

module.exports = config;
