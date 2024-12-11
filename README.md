# Celestia Namespace Analytics

A real-time analytics dashboard for monitoring Celestia network metrics, namespace usage, and transaction details.

## Features

- Real-time network statistics
- Namespace usage visualization
- Transaction search and details
- Gas analytics
- Dark/Light mode support
- Live block metrics

## Project Structure

```
src/
  components/
    ui/
      Card.js          # Reusable card component for consistent styling
      IconButton.js    # Reusable icon button component
    namespaces/
      Charts.js        # Main namespace analytics container
      NamespaceChart.js # Bar chart visualization for namespace usage
      NamespaceTable.js # Tabular view of active namespaces
    search/
      SearchBar.js     # Transaction search interface
      TransactionDetails.js # Transaction details modal
    metrics/
      BlockMetrics.js  # Block statistics and chain info
      GasAnalytics.js  # Gas prices and network token info
      MetricsPanel.js  # Overview metrics dashboard
    Header.js        # Application header with theme toggle
  lib/
    api.js            # API integration with Celenium endpoints
    utils/
      formatters.js   # Utility functions for data formatting
      endpoints.js    # API endpoint constants
  hooks/
    useDarkMode.js    # Custom hook for managing dark mode state
    useNamespaces.js  # Custom hook for fetching namespace data
    useNetworkStats.js # Custom hook for fetching network statistics
```

## Tech Stack

- Next.js 14
- React Query for data fetching
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

## Key Components

### Metrics

- **MetricsPanel**: Displays key network statistics including total blocks, active addresses, gas price, and total supply
- **BlockMetrics**: Shows real-time block information and validator statistics
- **GasAnalytics**: Provides current gas prices and network token details

### Namespaces

- **Charts**: Container component managing namespace data visualization
- **NamespaceChart**: Visual representation of namespace usage across the network
- **NamespaceTable**: Detailed list of active namespaces with key metrics

### Search

- **SearchBar**: Interface for searching transactions by hash
- **TransactionDetails**: Detailed view of transaction information

### Hooks

- **useNetworkStats**: Custom hook for fetching network statistics
- **useNamespaces**: Custom hook for fetching namespace data
- **useDarkMode**: Custom hook for managing dark mode state

## API Integration

The dashboard integrates with the Celenium API for Celestia network data:

- Network statistics
- Namespace metrics
- Transaction details
- Gas prices
- Block information

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/Olanetsoft/celestia-explorer.git
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT License](LICENSE)
