module.exports = {
  scheme: 'drinking-game-app',
  web: {
    bundler: 'metro',
  },
  name: 'Drinking Game App',
  slug: 'drinking-game-app',
  extra: {
    colyseusApiUrl: "wss://drinking-game-app-production.up.railway.app",
    eas: {
      projectId: "dbcb5f8c-6dac-4156-ab15-fd91f8338317"
    }
  },
  android: {
    package: "com.aaronvandenberg.drinkinggameapp",
    versionCode: 1
  },
  updates: {
    url: "https://u.expo.dev/dbcb5f8c-6dac-4156-ab15-fd91f8338317"
  },
  runtimeVersion: {
    policy: "sdkVersion"
  }
};
