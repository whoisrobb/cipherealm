import ImageSlider from '@/components/elements/image-slider'
import React from 'react'

const images = [
  '720116452_1.png',
  '720116452_2.png',
  '720116452_3.png',
  '720116452_1.png',
  '720116452_2.png',
  '720116452_3.png',
  '720116452_1.png',
  '720116452_2.png',
]

const Slider = () => {
  return (
    <div>
      <ImageSlider images={images} />
    </div>
  )
}

export default Slider
