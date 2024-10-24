const Footer = () => {
  const ratingURL =
    "https://chrome.google.com/webstore/detail/codingdude-contest-remind/gceicoplhhmgcoanpkbnopdccpghbngk";
  return (
    <footer>
      <div className="shortcut-key">
        <p>open extension</p>
        <span>Ctrl + Shift + X</span>
      </div>
      <div className="rating">
        <p>
          Your feedback makes a difference! <br /> Rate CodingDude and help us
          serve you better!
        </p>
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
