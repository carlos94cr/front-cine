import "./Footer.scss";

const Footer = () => {
  const copyrightYear = new Date().getFullYear();
  return (
    <div className="Footer">
      <div className="copyright">
        <span>UPGRADE CINES   </span>
        <span className="material-symbols-outlined">copyright</span>
        <span>   {copyrightYear}</span>
      </div>
    </div>
  );
};

export default Footer;
