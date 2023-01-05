import "./Main.scss";
const Main = () => {
  return (
    <div className="main-page container">
      <div className="main-page__filters">
        <p className="btn">Reset Filters</p> <p className="btn">Copy Link</p>
        <div className="filters filters__category">Category</div>
        <div className="filters filters__brand">Brand</div>
        <div className="filters filters__price">Price</div>
        <div className="filters filters__stock">Stock</div>
      </div>
      <div className="main-page__product-list">
        <div className="product-list__header">
          <p className="btn product-list__sort-options">Sort options:</p>
          <p className="product-list__found">Found:</p>
          <div className="product-list__search-container">
            <form action="">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">
                <i className="search-btn"></i>
              </button>
            </form>
          </div>
          <p className="product-list__view-switch"></p>
        </div>
        <div className="product-container">
          {/* placeholder, TODO do as separate component */}
          <div className="product-card">
            <a href="/details">
              <img
                src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="product-card">
            <a href="/details">
              <img
                src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="product-card">
            <a href="/details">
              <img
                src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="product-card">
            <a href="/details">
              <img
                src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
