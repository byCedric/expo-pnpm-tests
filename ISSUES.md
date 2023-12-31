# Using pnpm with Expo 49

- Installation was successful with `pnpm create expo ./pnpm-expo-49 -t blank@beta`

- Manually bumped to `react-native` from `0.72.0-rc.6` to `0.72.0`

- Running `pnpm start`
  > _Issue_: results in `Need to install the following packages: expo-internal@0.0.0. Ok to proceed? (y)`
  > _Issue_: after installing `pnpm start` results in `Error: expo must be installed`
  > _Caused by_ `expo-internal` not being found by pnpm, set through `@expo/cli`'s **package.json** `bin` section
  > _Caused by_ the `pwd` being set to `<projectRoot>`, basically running `npm exec` outside the scope of `<projectRoot>/node_modules/expo` (it needs to call `<projectRoot>/node_modules/expo/node_modules/.bin/expo-internal`)
  > **Fixed** in **./patches/expo@49.0.0-alpha.5.patch**
  > **Validated** using patch and `pnpm install` using the following commands:
  >   - `npx expo --help`
  >   - `pnpm expo --help`
  >   - `yarn expo --help`
  >   - `npm exec -- expo --help`
  >   - Note, this fails: `npm expo --help`
  >   - `npm start`
  >   - `pnpm start`
  >   - `yarn start`

- Running `pod install` inside **/ios**
  > _Issue_ imported files from `expo/scripts/autolinking.rb` DOES NOT work with pnpm
  > _Issue_ imported files from `expo-modules-autolinking` DOES NOT work with pnpm
  > _Issue_ `expo-modules-autolinking` is only doing a superficial search, and is not searching in the right paths for pnpm
  > _Caused by_ `process.cwd()` still being at the `<projectRoot>/ios`, causing modules not to be found
  > **Fixed** in **./patches/expo@49.0.0-alpha.5.patch**
  > **Fixed** in **./patches/expo-modules-autolinkoing@1.5.0.patch**

- Running `pnpm expo run:ios`
  > _Issue_ Metro can't resolve the `./node_modules/expo/AppEntry`
  > **Fixed** by adding `metro.config.js` with `config.resolver.unstable_enableSymlinks = true;`
  > _Issue_ Metro can't resolve `../../App` from `./node_modules/expo/AppEntry`
  > **Fixed** by using `index.js` instead of `./node_modules/expo/AppEntry`
  > _Issue_ Metro can't resolve `@babel/runtime/helpers/interopRequireDefault` from `index.js`
  > **Fixed** by adding `@babel/runtime` to project's dev dependencies
  > _Issue_ Metro can't resolve `metro-runtime/src/modules/asyncRequire` defined in the default Metro config
  > **Fixed** by resolving the modules in order from `react-native` -> `metro-runtime/...`
