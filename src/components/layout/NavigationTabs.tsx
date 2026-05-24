type Tab = 'main' | 'favorites' | 'compare';

type NavigationTabsProps = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    favoritesCount: number;
    compareCount: number;
};

function NavigationTabs({
                            activeTab,
                            setActiveTab,
                            favoritesCount,
                            compareCount
                        }: NavigationTabsProps) {
    return (
        <nav className="tab-navigation">
            <button
                className={`tab-button ${activeTab === 'main' ? 'active' : ''}`}
                onClick={() => setActiveTab('main')}
            >
                🏠 Main Catalog
            </button>

            <button
                className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
            >
                ⭐ Favorites

                {favoritesCount > 0 && (
                    <span className="tab-counter">
                        {favoritesCount}
                    </span>
                )}
            </button>

            <button
                className={`tab-button ${activeTab === 'compare' ? 'active' : ''}`}
                onClick={() => setActiveTab('compare')}
            >
                📊 Compare

                {compareCount > 0 && (
                    <span className="tab-counter-blue">
                        {compareCount}
                    </span>
                )}
            </button>
        </nav>
    );
}

export default NavigationTabs;