interface Props {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: Props) {
    return (
        <div className="searchWrapper">
            <label htmlFor="search">Search products</label>

            <input
                id="search"
                type="text"
                placeholder="Search by title, brand or category"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;