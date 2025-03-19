import '../css/Footer.css';

function Footer() {

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();

  return (
    <footer className="footer">
      <p>© {month} {day} of {year}</p>
    </footer>
  );
}

export default Footer;