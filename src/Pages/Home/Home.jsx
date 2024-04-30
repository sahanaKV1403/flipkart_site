import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import Carousel from '../../Components/Carousel/Carousel';
import './Home.css'

const Home = () => {
  return (
      <div className="background">        
          <Sidebar />
          <Carousel />
          <Feed />
      </div>

  )
}

export default Home

