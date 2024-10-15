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
- **Email**: [amleshkr396@gmail.com]
- **Password**: [amleshkr396]
### Please wait for few minutes, Login may take time for sending first response

## Add the .env file to run backend
- **MONGO_URI**: Paste the database connection url
- **JWT_SECRET**: secret


## Link to download using git clone
- [backend link](https://github.com/amlesh-kumar01/tree-view-app-backend.git)

## Video Overview
To know more about the website, watch this [video](https://drive.google.com/open?id=1GzLZgxLtsdkZfgzgMp8HBX93IYSbKOC3&usp=drive_fs).

## How to use Inventory Insight
- Without login Inventory insight can't be used
- First login using the credentials given above and the visualize the inventory
- You can add, remove, add quantity, remove quantity of items and do many more things .
- Right click or Long Press to see options to view, add , rename, etc items.
- You can search items present using the search box provided above.


