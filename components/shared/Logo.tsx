import Image from 'next/image'

const Logo = () => {
  return (
    <>
      <Image 
        src="/assets/images/logo.png"
        alt="event hub logo"
        width={100}
        height={0}
        priority={true}
        quality={75}
      />
    </>    
  )
}

export default Logo