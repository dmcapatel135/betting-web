module.exports = {
  moduleNameMapper: {
    '@api': ['<rootDir>/app/api/index'],
    '@api/(.*)': ['<rootDir>/app/api/$1'],
    '@actions': ['<rootDir>/app/actions/index'],
    '@actions/(.*)': ['<rootDir>/app/actions/$1'],
    '@contexts': ['<rootDir>/app/contexts/index'],
    '@contexts/(.*)': ['<rootDir>/app/contexts/$1'],
    '@components': ['<rootDir>/app/components/index'],
    '@components/(.*)': ['<rootDir>/app/components/$1'],
    '@containers': ['<rootDir>/app/containers/index'],
    '@containers/(.*)': ['<rootDir>/app/containers/$1'],
    '@hooks': ['<rootDir>/app/hooks/index'],
    '@hooks/(.*)': ['<rootDir>/app/hooks/$1'],
    '@utils': ['<rootDir>/app/utils/index'],
    '@utils/(.*)': ['<rootDir>/app/utils/$1'],
    '@/(.*)': ['<rootDir>/app/$1'],
  },
};
