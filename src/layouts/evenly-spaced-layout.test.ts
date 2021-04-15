import { createEvenlySpacedLayout } from './evenly-spaced-layout'

it.each([
  { numPanes: 0, grid: [] },
  { numPanes: 1, grid: [[0, 0]] },
  { numPanes: 2, grid: [[0, 0], [0, 1]] },
  { numPanes: 3, grid: [[0, 0], [0, 1], [1, 0]] },
  { numPanes: 4, grid: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  { numPanes: 5, grid: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1]] },
  { numPanes: 6, grid: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] },
  { numPanes: 7, grid: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [2, 0], [2, 1]] },
  { numPanes: 8, grid: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]] },
  { numPanes: 9, grid: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
  { numPanes: 10, grid: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
  { numPanes: 11, grid: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2]] },
  { numPanes: 12, grid: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]] },
])('can create a grid for a given number of panes', ({ numPanes, grid }) => {
  expect(createEvenlySpacedLayout(numPanes)).toEqual(grid)
})

it('can create a grid for 50 panes', () => {
  const grid = createEvenlySpacedLayout(50)
  expect(grid.length).toEqual(50)
  expect(grid.filter(([row]) => row === 0).length).toEqual(8)
  expect(grid.filter(([row]) => row > 0).length).toEqual(42)
})
