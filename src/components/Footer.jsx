const Footer = () => {
  const ratingURL =
    "https://chrome.google.com/webstore/detail/codingdude-contest-remind/gceicoplhhmgcoanpkbnopdccpghbngk";
  return (
    <footer>
      <div className="shortcut-key">
        <p>open extension</p>
        <span>Ctrl+Shift+K</span>
      </div>
      <div className="rating">
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
      </div>
    </footer>
  );
};

export default Footer;
