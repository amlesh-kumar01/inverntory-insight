import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { getParentGodowns, getGodownByParentId } from '../../Api/godownRequest.js';
import { useDrop } from 'react-dnd';
import { editItem } from '../../Api/itemsRequest.js';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const Sidebar = ({ setCurrentGodown }) => {
  const [locations, setLocations] = useState([]);
  const [expandedLocations, setExpandedLocations] = useState({});
  const [sublocations, setSublocations] = useState({});
  const [expandedSublocations, setExpandedSublocations] = useState({});
  const [godowns, setGodowns] = useState({});
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const locationData = await getParentGodowns();
      setLocations(locationData || []);
      setLoading(false);
    };
    fetchLocations();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const collapseAll = () => {
    setExpandedLocations({});
    setExpandedSublocations({});
  };

  const toggleExpand = async (type, parent_id) => {
    if (type === 'location') {
      if (!expandedLocations[parent_id]) {
        setLoading(true);
        const sublocationData = await getGodownByParentId(parent_id);
        setSublocations({ ...sublocations, [parent_id]: sublocationData });
        setLoading(false);
      }
      setExpandedLocations({ ...expandedLocations, [parent_id]: !expandedLocations[parent_id] });
    } else if (type === 'sublocation') {
      if (!expandedSublocations[parent_id]) {
        setLoading(true);
        const godownData = await getGodownByParentId(parent_id);
        setGodowns({ ...godowns, [parent_id]: godownData });
        setLoading(false);
      }
      setExpandedSublocations({ ...expandedSublocations, [parent_id]: !expandedSublocations[parent_id] });
    }
  };

  const handleDrop = (item, godown) => {
    console.log(`Item ${item.name} dropped on Godown ${godown._id}`);
    item.godown_id = godown._id;
    editItem(item._id, { godown_id: godown._id });
    setCurrentGodown(godown);
  };

  const DroppableGodown = ({ godown }) => {
    const [, drop] = useDrop(() => ({
      accept: 'ITEM',
      drop: (item) => handleDrop(item, godown),
    }));
    return (
      <ContextMenuTrigger id={`godown_${godown._id}`}>
        <li
          ref={drop}
          onClick={() => {
            setCurrentGodown(godown);
            setSidebarOpen(false);
          }}
          className="godown-item underline"
        >
          {godown.name}
        </li>
        <ContextMenu id={`godown_${godown._id}`} className="context-menu">
          <MenuItem onClick={() => console.log('Rename Godown')} className="context-menu-item">Rename</MenuItem>
          <MenuItem onClick={() => console.log('Delete Godown')} className="context-menu-item">Delete</MenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
    );
  };

  return (
    <div>
      {isMobile && (
        <img
          src="/assets/Dropdown.png"
          alt="logo"
          className="sidebar-logo"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      )}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Inventory Locations</h2>
        <button onClick={collapseAll} className="collapse-all-btn">Collapse All</button>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ul>
            {locations.map(location => (
              <li key={location._id}>
                <ContextMenuTrigger id={`location_${location._id}`}>
                  <div
                    onClick={() => toggleExpand('location', location._id)}
                    className="location-item"
                    aria-expanded={expandedLocations[location._id]}
                  >
                    {expandedLocations[location._id] ? '▼' : '➤'}<span>{location.name}</span>
                  </div>
                </ContextMenuTrigger>
                <ContextMenu id={`location_${location._id}`} className="context-menu">
                  <MenuItem onClick={() => console.log('Add Sublocation')} className="context-menu-item">Add Sublocation</MenuItem>
                  <MenuItem onClick={() => console.log('Rename Location')} className="context-menu-item">Rename</MenuItem>
                  <MenuItem onClick={() => console.log('Delete Location')} className="context-menu-item">Delete</MenuItem>
                </ContextMenu>
                {expandedLocations[location._id] && (
                  <ul className="expanded">
                    {(sublocations[location._id] || []).map(sublocation => (
                      <li key={sublocation._id}>
                        <ContextMenuTrigger id={`sublocation_${sublocation._id}`}>
                          <div
                            onClick={() => toggleExpand('sublocation', sublocation._id)}
                            className="sublocation-item"
                            aria-expanded={expandedSublocations[sublocation._id]}
                          >
                            {expandedSublocations[sublocation._id] ? '▼' : '➤'}<span>{sublocation.name}</span>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenu id={`sublocation_${sublocation._id}`} className="context-menu">
                          <MenuItem onClick={() => console.log('Add Godown')} className="context-menu-item">Add Godown</MenuItem>
                          <MenuItem onClick={() => console.log('Rename Sublocation')} className="context-menu-item">Rename</MenuItem>
                          <MenuItem onClick={() => console.log('Delete Sublocation')} className="context-menu-item">Delete</MenuItem>
                        </ContextMenu>
                        {expandedSublocations[sublocation._id] && (
                          <ul className="expanded">
                            {(godowns[sublocation._id] || []).map(godown => (
                              <DroppableGodown key={godown._id} godown={godown} />
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
