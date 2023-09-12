import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="green_gradient head_text text-center">
        Useful information for everyone
      </h1>
      <p className="desc text-center">
        Share your useful knowledge with others
      </p>

      <Feed />
    </section>
  )
}

export default Home