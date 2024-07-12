import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pagesToShow = 5; // Number of page buttons to show at once
  const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  useEffect(() => {
    const fetchPrducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=6&skip=${(page - 1) * 6}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(parseInt(data.total / 6));
    };
    fetchPrducts();
  }, [page]);
  const selectPageHandler = (page) => {
    if (page >= 1 && page <= totalPages) setPage(page);
  };
  return (
    <div>
      {products && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt="product-image" />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products && (
        <div className="pagination">
          <span
            onClick={() => {
              selectPageHandler(page - 1);
            }}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((i) => {
            return (
              <span
                className={page === i ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i)}
                key={i}
              >
                {i}
              </span>
            );
          })}
          <span
            onClick={() => {
              selectPageHandler(page + 1);
            }}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
