import React, { useState, useEffect } from 'react';
import './sidebar.css';
import {  getParentGodowns, getGodownByParentId } from '../../Api/godownRequest.js';

const Sidebar = ({setCurrentGodown}) => {
  const [locations, setLocations] = useState([]);
  const [expandedLocations, setExpandedLocations] = useState({});
  const [sublocations, setSublocations] = useState({});
  const [expandedSublocations, setExpandedSublocations] = useState({});
  const [godowns, setGodowns] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      const locationData = await getParentGodowns();
      setLocations(locationData || []);
      setLoading(false);
    };
    fetchLocations();
  }, []);

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

  const handleRightClick = (event, type, name) => {
    event.preventDefault();
    console.log(`Right click on ${type}: ${name}`);
  };

  const collapseAll = () => {
    setExpandedLocations({});
    setExpandedSublocations({});
  };

  return (
    <div className="sidebar">
      <h2>Inventory Locations</h2>
      <button onClick={collapseAll} className="collapse-all-btn">Collapse All</button>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <ul>
          {locations.map(location => (
            <li key={location._id}>
              <div
                onClick={() => toggleExpand('location', location._id)}
                onContextMenu={(e) => handleRightClick(e, 'location', location._id)}
                style={{ color: 'blue' }}  
                aria-expanded={expandedLocations[location._id]}
              >
                {location.name}
              </div>
              {expandedLocations[location._id] && (
                <ul className="expanded">
                  {(sublocations[location._id] || []).map(sublocation => (
                    <li key={sublocation._id}>
                      <div
                        onClick={() => toggleExpand('sublocation', sublocation._id)}
                        onContextMenu={(e) => handleRightClick(e, 'sublocation', sublocation._id)}
                        style={{ color: 'green' }}  // Change text color for sublocations
                        aria-expanded={expandedSublocations[sublocation._id]}
                      >
                        {sublocation.name}
                      </div>
                      {expandedSublocations[sublocation._id] && (
                        <ul className="expanded">
                          {(godowns[sublocation._id] || []).map(godown => (
                            <li
                              key={godown._id}
                              onClick={() => setCurrentGodown(godown)}
                              onContextMenu={(e) => handleRightClick(e, 'godown', godown._id)}
                              style={{ color: 'red' }}  
                            >
                              {godown.name}
                            </li>
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
  );
};

export default Sidebar;
