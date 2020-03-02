import { useState, useEffect } from 'react'
import api from '../util/api'

const useDesigns = () => {
  const [designs, setDesigns] = useState([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const getDesigns = async () => {
      const { total, designs, hasMore } = await api.Design.getAll({ skip: 0 })
      setDesigns(designs)
      setTotal(total)
      setHasMore(hasMore)
    }

    getDesigns()
  }, [])

  const loadMore = async () => {
    const res = await api.Design.getAll({ skip: designs.length })
    setDesigns([...designs, ...res.designs])
    setTotal(res.total)
    setHasMore(res.hasMore)
  }

  return [
    designs,
    total,
    hasMore,
    setDesigns,
    setTotal,
    loadMore
  ]
}

export default useDesigns
