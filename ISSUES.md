# Using pnpm with Expo 49

- Installation was successful with `pnpm create expo ./pnpm-expo-49 -t blank@beta`
- Manually bumped to `react-native` from `0.72.0-rc.6` to `0.72.0`

- Running `pnpm start`
  > **issue**: results in `Need to install the following packages: expo-internal@0.0.0. Ok to proceed? (y)`
  > **issue**: after installing `pnpm start` results in `Error: expo must be installed`
  > Caused by `expo-internal` not being found by pnpm, set through `@expo/cli`'s **package.json** `bin` section


