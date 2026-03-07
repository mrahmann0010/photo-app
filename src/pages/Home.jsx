function Home() {
  return (
    <section className="bg-main-background-2 min-h-screen bg-cover bg-center bg-no-repeat font-playfair">

      <MainTitle />
    </section>
  );
}

export default Home;


const MainTitle = () => {
  return(
    <div className="px-6 pt-32 text-center">
      <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold leading-snug">
        <span className="text-white">The proper function of man is to </span>

        <span className="bg-white-transparent-text">
          live, not to exist.
        </span>

        <span className="text-white"> I shall not waste my days in trying to prolong them. I shall </span>

        <span className="bg-white-transparent-text">
          use my time.
        </span>
      </h1>
    </div>
  )
}

const ElseWhere = () => {
  return(
    <div>
      
    </div>
  )
}