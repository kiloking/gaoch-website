function RobotsTxt() {
  // getServerSideProps will handle the response
}

export async function getServerSideProps({ res }) {
  const robotsTxt = `
    User-agent: *
    Allow: /
    Disallow: /private/
    
    Sitemap: https://your-domain.com/sitemap.xml
  `;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default RobotsTxt;
