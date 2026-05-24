type ItemsPerPageSelectProps = {
    value: number;
    options: number[];
    onChange: (value: number) => void;
};

function ItemsPerPageSelect({
                                value,
                                options,
                                onChange
                            }: ItemsPerPageSelectProps) {
    return (
        <div className="itemsPerPage">
            <label>Products per page:</label>

            <select
                value={value}
                onChange={e =>
                    onChange(Number(e.target.value))
                }
            >
                {options.map(option => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ItemsPerPageSelect;