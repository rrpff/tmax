# tmax

A tool for running multiple processes in parallel with useful output. Designed for monorepos.

> ⚠️ Alpha and still a little frustrating to use. May be bugs.

[![asciicast](https://asciinema.org/a/Ggse9O2yHRJDwa1ENsE8T0DGX.svg)](https://asciinema.org/a/Ggse9O2yHRJDwa1ENsE8T0DGX)

## Configuration

See ![`tmax.config.js`](./tmax.config.js), ![`tmax.example.js`](./tmax.example.js) and ![`tmax.example.json`](./tmax.example.json).

### Example

```js
module.exports = {
  panes: [
    { label: 'Web', command: 'npm run start-web' },
    { label: 'Test', command: 'npm t -- --watch' },
    { label: 'REPL', command: 'node' },
    {
      label: 'Builds',
      commands: [
        {
          label: 'package-a',
          command: `./node_modules/lerna/cli.js exec npm run build-watch --scope package-a`,
        },
        {
          label: 'package-b',
          command: `./node_modules/lerna/cli.js exec npm run build-watch --scope package-b`,
        },
        {
          label: 'package-c',
          command: `./node_modules/lerna/cli.js exec npm run build-watch --scope package-c`,
        },
      ]
    }
  ]
}
```

## Todo

- [ ] Standardise scrolling between shell panes and log panes.
- [ ] Add some tests (yeah I didn't TDD much of this.)
- [ ] Add --help.
- [ ] Support custom layouts.
- [ ] Bug: Display correct error when an error occurs in configuration file.
