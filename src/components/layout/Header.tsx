type HeaderProps = {
    productsCount: number;
};

function Header({ productsCount }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-brand">
                <span
                    className="header-icon"
                    role="img"
                    aria-label="shopping cart"
                >
                    🛒
                </span>

                <h1>Product Catalog</h1>
            </div>

            <div className="header-badge">
                <span className="pulse-dot"></span>
                Live: {productsCount} Items
            </div>
        </header>
    );
}

export default Header;