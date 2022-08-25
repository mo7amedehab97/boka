import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../../styles/Slider.module.css'
import Story from './Story'

const Slider = () => {
  const [categories, setCategories] = useState([])
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(1400)
  const [limit, setLimit] = useState(8)
  const [itemsNumber, setItemsNumber] = useState(8)

  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    const updateWidth = () => {
      if (Number(width) > 1118) {
        setLimit(8)
      } else if (Number(width) >= 800) {
        setLimit(6)
        setItemsNumber(6)
      } else if (Number(width) >= 560) {
        setLimit(4)
        setItemsNumber(4)
      } else {
        setLimit(3)
        setItemsNumber(3)
      }
    }
    updateWidth()
    return () => window.removeEventListener('resize', updateDimensions)
  }, [width])
  useEffect(() => {
    fetch(
      `https://api.dev.boka.co/business-management/lookups/business-categories?limit=${limit}&offset=${offset}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
  }, [offset, limit, width])
  return (
    <section className={styles.container}>
      <article className={styles.inner_container}>
        <div>
          <Image
            src="/Right.svg"
            width={11.54}
            alt=""
            height={20}
            onClick={() => {
              if (categories.pageInfo.hasPreviousPage) {
                setOffset((prev) => {
                  return prev - itemsNumber
                })
              }
            }}
          />
        </div>
        <div className={styles.stories_container}>
          {categories.data?.map((category) => {
            return (
              <Story
                key={category.id}
                name={category.nameEn}
                image={category?.iconUrl}
              />
            )
          })}
        </div>
        <div>
          <Image
            src="/Left.svg"
            width={11.54}
            alt=""
            height={20}
            onClick={() => {
              if (categories.pageInfo.hasNextPage) {

                setOffset((prev) => {
                  return prev + itemsNumber
                })
              } 
            }}
          />
        </div>
      </article>
    </section>
  )
}

export default Slider
