import blessed from 'blessed'
import contrib from 'blessed-contrib'
import { GRID_WIDTH, PANES_HEIGHT, HEADING_HEIGHT } from '../config'
import { IGridLayout, IPane } from '../interfaces'

export const createBasePane = (layout: IGridLayout, container: contrib.grid, index: number): IPane => {
  const { x, y, width, height } = getPositions(layout, index)
  const element = container.set(y, x, height, width, blessed.box, {})

  return {
    element,
    focus: () => element.focus(),
    kill: () => {}
  }
}

const getPositions = (layout: IGridLayout, index: number) => {
  const [row, col] = layout[index]
  const numRows = 1 + Math.max(...layout.map(cell => cell[0]))
  const rowNumCells = layout.filter(cell => cell[0] === row).length
  const width = GRID_WIDTH / rowNumCells
  const height = PANES_HEIGHT / numRows
  const x = col * width
  const y = HEADING_HEIGHT + row * height

  return { x, y, width, height }
}
