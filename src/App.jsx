import { useEffect, useState } from "react";
import { createClient } from "contentful";


const client = createClient({
  space: "kkh4fdzuzspr",
  accessToken: "PFXEGy0ET409cMJ50ydmu0Uu0-o1B0f0rGUleR-cU7Q",
});

function App() {

  const [items, setItems] = useState([]); // Dette er en Hook, den gemmer data der kan ændre sig

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .getEntries() // henter alt

      .then((response) => {

        setItems(response.items);

        setLoading(false);
      })

      .catch((err) => {

        console.error(err);
      });

  }, []);

  if (loading) return <p>Loader...</p>;

  // Extract content by type
  const header = items.find((item) => item.sys.contentType.sys.id === "header");
  const info = items.find((item) => item.sys.contentType.sys.id === "info");
  const footer = items.find((item) => item.sys.contentType.sys.id === "footer");
  const billedereEntry = items.find((item) => item.sys.contentType.sys.id === "billeder");
  const billederImages = billedereEntry?.fields.billeder || [];

  return (
<div>
      {/* HEADER */}
<header className="mainHeader">
<h1>{header?.fields.title}</h1>
        <img className="secondImg"
          src={header?.fields.headerImage?.fields.file.url}
          alt="Header"
          width="500"
        />
</header>
      {/* INFO */}
<section>
<p>{info?.fields.information}</p>
</section>
      {/* BILLEDER */}
<section>
  <p>{billedereEntry?.fields.billedetext}</p>
        {billederImages.map((img) => (
<img className="mainImg"
            key={img.sys.id}
            src={img.fields.file.url}
            alt=""
            width="300"
          />
        ))}
</section>
      {/* FOOTER */}
<footer>
<p>{footer?.fields.medlemmer}</p>
</footer>
</div>
  );

}

export default App;
 