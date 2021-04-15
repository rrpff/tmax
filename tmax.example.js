const { Transform } = require('stream')

const numbersStream = (() => {
  const stream = new Transform()
  const push = () => {
    const number = Math.floor(Math.random() * 100)
    stream.push(`${number}\n`)
    setTimeout(push, 500)
  }

  push()
  return stream
})()

const randomLetters = (write) => {
  const push = () => {
    const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
    write(letter)
    setTimeout(push, 500)
  }

  push()
}

module.exports = {
  panes: [
    { label: 'App', command: 'echo npm start' },
    { label: 'Test', command: 'echo npm t -- --watch' },
    { label: 'REPL', command: 'node' },
    { label: 'Random Numbers', stream: numbersStream },
    { label: 'Random Letters', function: randomLetters },
    {
      label: 'Greetings',
      commands: [
        {
          label: 'English',
          command: `echo "good day"`,
        },
        {
          label: 'French',
          command: 'echo "bonjour"',
        },
        {
          label: 'German',
          command: 'echo "guten tag"',
        },
      ]
    }
  ]
}
