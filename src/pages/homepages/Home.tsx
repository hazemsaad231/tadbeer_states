import About from "./about"
import Category from "./category"
import Features from "./features"
import Hero from "./hero"
import How_work from "./how-work"
// import Why_work from "./why-we"




function Home() {
  return (
    <div>
      <Hero />
      <How_work />
      <Features />
     <Category />
      {/* <Why_work /> */}
   <About />
    </div>
  )
}

export default Home
