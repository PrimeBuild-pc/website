const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#ff7514] focus:text-black focus:font-semibold focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
    >
      Salta al contenuto principale
    </a>
  );
};

export default SkipLink;
