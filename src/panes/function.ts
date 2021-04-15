import contrib from 'blessed-contrib'
import { IGridLayout, IPaneConfig, IPane } from '../interfaces'
import { createLogPane } from './log'

export const createFunctionPane = (layout: IGridLayout, container: contrib.grid, index: number, paneOptions: IPaneConfig): IPane => {
  const pane = createLogPane(layout, container, index, { label: paneOptions.label })

  paneOptions.function!(chunk => {
    pane.element.setContent(pane.element.content + chunk)
  })

  return pane
}
