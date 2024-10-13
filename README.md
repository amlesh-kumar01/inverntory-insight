# Inventory Insight

## Overview
Inventory Insight is a web application designed to efficiently manage and visualize the hierarchy of godown locations, sub-locations, and stored items. The application displays details of the selected item when clicked, helping keep inventory organized and manageable.

## Features

### Tree Structure
- **Hierarchy Visualization**: Display the hierarchy of godown locations, sub-locations, and items as a sidebar.
- **Expandable/Collapsible**: Users can expand or collapse locations to view items within them.
- **Product Display**: Clicking an item shows its details in the main section of the page.

### User Authentication
- **Login Page**: A simple login page with predetermined credentials to access the application.

### Data Structure
- **Locations**: Represent sections and subsections of the godown.
  - **Godowns**: Includes id, name, and parent_id.
  - **Sub-Godowns**: Nested within godowns.
- **Items**: Products stored within sections, with details like item_id, name, quantity, category, status, godown_id, price, brand, attributes, and image_url.

### Deployment
- **Dockerization**: The system is Dockerized for easier deployment.
- **Hosting**: Deployed on Vercel for seamless access.

## Setup and Installation
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/amlesh-kumar01/inverntory-insight.git
   cd inverntory-insight
2. **Install the dependency**
   ```sh
   npm install --legacy-peer-deps
3. **Build**
   ```sh
   npm run build

## Login Credentials for Website
- **Username**: [your-username]
- **Password**: [your-password]

## Video Overview
To know more about the website, watch this [video](https://drive.google.com/open?id=1GzLZgxLtsdkZfgzgMp8HBX93IYSbKOC3&usp=drive_fs).
