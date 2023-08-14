const Footer = () => {
  const ratingURL =
    "https://chrome.google.com/webstore/detail/codecontest-contest-remin/gceicoplhhmgcoanpkbnopdccpghbngk/";
  return (
    <footer>
      <p>Do you like CodingDude?</p>
      <button>
        <a
          href={ratingURL}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rate it!
        </a>
      </button>
    </footer>
  );
};

export default Footer;