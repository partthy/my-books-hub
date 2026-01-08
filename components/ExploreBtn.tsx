'use client'
import Image from "next/image"
const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-5 mx-auto">
          <a href="#books">Explore Books
              <Image src='/icons/arrow-down.svg' alt="Down Arrow" width={24} height={24}/>
      </a>
    </button>
  )
}

export default ExploreBtn
