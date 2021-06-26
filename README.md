# react-device-orientation-hook

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This project skeleton was created to help people get started with creating their own React component library using:

- [Rollup](https://github.com/rollup/rollup)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)

It also features:

- [Storybook](https://storybook.js.org/) to help you create and show off your components
- [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library) enabling testing of the components


## Usage
```sh
npm i react-device-orientation-hook
```

```typescript
import useDeviceOrientation from 'react-device-orientation-hook;

function Component() {
  const { transformStyle, resetPivotOrientation } = useDeviceOrientation();

  return (
    <>
      <div style={transformStyle} onClick={resetPivotOrientation} >
        Hello World!
      </div>
      <p>Touch text and Revise orientation</p>
    </>
  );
}
```

## Development

### Testing

```
npm run test
```

### Building

```
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```
npm run storybook
```
