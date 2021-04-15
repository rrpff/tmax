import contrib from 'blessed-contrib'
import { parseArgsStringToArgv } from 'string-argv'
import xterm from '../blessed-xterm'
import { IGridLayout, IPaneConfig, IWorkspaceConfig, IPane } from '../interfaces'
import { createBasePane } from './base'

export const createShellPane = (layout: IGridLayout, container: contrib.grid, index: number, paneOptions: IPaneConfig, workspaceOptions: IWorkspaceConfig): IPane => {
  const { element: parent } = createBasePane(layout, container, index)
  const term: any = xterm({
    parent,
    label: ` ${paneOptions.label} `,
    content: '',
    mouse: true,
    scrollbar: true,
    border: { type: 'line' },
    style: {
      label: { bold: true },
      border: { fg: 'grey' },
      scrollbar: { bg: 'grey' },
      focus: {
        scrollbar: { bg: 'green' },
        border: { fg: 'green' }
      }
    },
  })

  const args = parseArgsStringToArgv(paneOptions.command!)
  const program = args.shift()

  term.on('click', () => term.focus())
  term.spawn(program, args, paneOptions.cwd || workspaceOptions.cwd)

  return {
    label: paneOptions.label,
    element: term,
    focus: () => term.focus(),
    kill: () => term.kill()
  }
}
