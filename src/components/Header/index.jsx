import './style.css'

const Header = ({ title, subtitle ,children }) => {
  return (
    <header className='header'>
      <h1 className='header__heading'> {title} </h1>
      <p className='header__subtitle muted-text'> {subtitle}  </p>
      {children && children}
    </header>
  )
}

export default Header