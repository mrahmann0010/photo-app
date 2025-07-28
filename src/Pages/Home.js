function Home() {
  return (
    <section className="bg-main-background-2 min-h-screen bg-cover bg-center bg-no-repeat font-playfair">
      
      <div>
        <h1 className="text-3xl text-center font-bold text-white py-12 px-4">{`${mainLine}`}</h1>
      </div>
    </section>
  );
}

export default Home;

const mainLine = 'The proper function of man is to live, not to exist. I shall not waste my days in trying to prolong them. I shall use my time.';

      /* ✅ Mobile-only version */
      // <section className="md:hidden min-h-screen bg-[#f5f3ef] text-gray-900 pt-16 flex flex-col items-center justify-center px-4 relative">
      //   <div className="absolute inset-0 bg-hero-background bg-cover bg-center opacity-20 mix-blend-multiply animate-fade-in" />

      //   <h1 className="text-2xl font-serif text-center z-10 leading-snug tracking-tight opacity-0 translate-y-6 animate-slide-up delay-100">
      //     "Live, don’t just exist. <br />
      //     Use your time."
      //   </h1>

      //   <p className="mt-6 text-center text-base text-gray-700 z-10 font-light opacity-0 animate-fade-in delay-300">
      //     Photographer. Developer. Storyteller.
      //   </p>

      //   <button className="mt-10 z-10 bg-black text-white px-6 py-2 text-sm uppercase tracking-wide opacity-0 animate-slide-up delay-500">
      //     View My Gallery
      //   </button>
      // </section>