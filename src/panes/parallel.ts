import cp from 'child_process'
import contrib from 'blessed-contrib'
import { parseArgsStringToArgv } from 'string-argv'
import { COLOURS } from '../config'
import { IGridLayout, IPaneConfig, IWorkspaceConfig, IPane, ICommandConfig } from '../interfaces'
import { createLogPane } from './log'

export const createParallelPane = (layout: IGridLayout, container: contrib.grid, index: number, paneOptions: IPaneConfig, workspaceOptions: IWorkspaceConfig): IPane => {
  const pane = createLogPane(layout, container, index, { label: paneOptions.label })
  const terminators: (() => void)[] = []
  const killall = () => Promise.all(terminators.map(kill => kill()))

  paneOptions.commands!.forEach((commandOptions: ICommandConfig, index: number) => {
    const useStdout = commandOptions.stdout === false || paneOptions.stdout === false ? false : true
    const useStderr = commandOptions.stderr === false || paneOptions.stderr === false ? false : true
    const colour = COLOURS[index]

    const args = parseArgsStringToArgv(commandOptions.command)
    const program = args.shift()

    if (!program) throw new Error(`Invalid command: ${commandOptions.command}`)

    const proc = cp.spawn(program, args, { shell: true, cwd: commandOptions.cwd || paneOptions.cwd || workspaceOptions.cwd })

    if (useStdout) {
      proc.stdout.on('data', (chunk: Buffer) => {
        chunk.toString().split('\n').forEach((line: string) => {
          pane.element.pushLine(`{${colour}-fg}[${commandOptions.label}]{/${colour}-fg} ${line}`)
        })
      })
    }

    if (useStderr) {
      proc.stderr.on('data', (chunk: Buffer) => {
        chunk.toString().split('\n').forEach((line: string) => {
          pane.element.pushLine(`{${colour}-fg}[${commandOptions.label}]{/${colour}-fg} ${line}`)
        })
      })
    }

    terminators.push(() => proc.kill())
  })

  return { ...pane, kill: killall }
}
