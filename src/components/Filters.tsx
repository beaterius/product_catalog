interface Props {
    categories: string[];
    category: string;
    setCategory: (value: string) => void;
    inStockOnly: boolean;
    setInStockOnly: (value: boolean) => void;
    discountOnly: boolean;
    setDiscountOnly: (value: boolean) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    resetFilters: () => void;
}

function Filters({
                     categories,
                     category,
                     setCategory,
                     inStockOnly,
                     setInStockOnly,
                     discountOnly,
                     setDiscountOnly,
                     sortBy,
                     setSortBy,
                     resetFilters,
                 }: Props) {
    return (
        <section className="filters">
            <div>
                <label htmlFor="category">Category</label>

                <select
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="all">All</option>

                    {categories.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sort">Sort by</label>

                <select
                    id="sort"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="rating-desc">Rating: high to low</option>
                    <option value="title-asc">Title: A-Z</option>
                </select>
            </div>

            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                />

                In stock only
            </label>

            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={discountOnly}
                    onChange={e => setDiscountOnly(e.target.checked)}
                />

                Discount only
            </label>

            <button onClick={resetFilters}>Reset filters</button>
        </section>
    );
}

export default Filters;