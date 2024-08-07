import { render } from '@testing-library/react'
import { Pagination } from './pagination'
import { userEvent } from '@testing-library/user-event'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const { getByText } = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    expect(getByText('Página 1 de 20')).toBeInTheDocument()
    expect(getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to next page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const paginationButton = getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(paginationButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to previous page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const paginationButton = getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(paginationButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const paginationButton = getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(paginationButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })
  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()

    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const paginationButton = getByRole('button', {
      name: 'última página',
    })

    await user.click(paginationButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
