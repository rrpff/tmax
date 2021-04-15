module.exports = {
  title: 'tmax',
  panes: [
    {
      label: 'Build',
      command: 'npm run build-watch'
    },
    {
      label: 'Test',
      command: 'npm t -- --watch'
    }
  ]
}
