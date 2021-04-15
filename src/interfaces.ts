import blessed from 'blessed'

export type IGridLayout = [number, number][]

export interface IProcessTerminator {
  label: string
  kill: () => any
}

export interface IPane {
  element: blessed.Widgets.BoxElement | blessed.Widgets.Log
  label?: string
  focus: () => void
  kill: () => any
}

export interface ICommandConfig {
  label: string
  command: string
  cwd?: string
  stdout?: boolean
  stderr?: boolean
}

export interface IPaneConfig {
  label: string
  stream?: { on: (event: string, handler: (chunk: Buffer) => void) => void }
  function?: (write: (str: string) => void) => void
  command?: string
  commands?: ICommandConfig[]
  cwd?: string
  stdout?: boolean
  stderr?: boolean
}

export interface IWorkspaceConfig {
  title: string
  panes: IPaneConfig[]
  cwd?: string
}
