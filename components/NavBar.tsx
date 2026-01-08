import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  return (
      <header>
          <nav>
              <Link href='/' className='logo'>
                  <Image src='/icons/logo.png' alt='logo' width={24} height={24} />
                  <p>My-Books Collection</p>
              </Link>

              <ul>
                  <Link href='/'>Home</Link>
                  <Link href='/'>Books</Link>
                  <Link href='/'>Add Books</Link>
              </ul>
          </nav>
      
    </header>
  )
}

export default NavBar
