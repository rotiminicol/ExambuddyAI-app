const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for ENOENT <anonymous> file errors
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Handle source maps properly
config.serializer.createModuleIdFactory = function () {
  return function (path) {
    // Ensure we don't create invalid module IDs
    if (!path || path === '<anonymous>') {
      return 0;
    }
    return path;
  };
};

// Improve error handling for symbolication
config.symbolicator = {
  customizeFrame: (frame) => {
    // Filter out anonymous frames that cause ENOENT errors
    if (frame.file === '<anonymous>' || !frame.file) {
      return null;
    }
    return frame;
  }
};

// Handle Windows paths with spaces
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;