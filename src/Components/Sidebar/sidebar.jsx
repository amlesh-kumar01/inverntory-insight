// Sidebar.js
import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { getParentGodowns, getGodownByParentId,addGodown,deleteGodown,renameGodown  } from '../../Api/godownRequest.js';
import { useDrop } from 'react-dnd';
import { editItem } from '../../Api/itemsRequest.js';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import AddLocationModal from '../../utils/modals/addLocation.js'; 
import AddSublocationModal from '../../utils/modals/addSubLocationModal.js';
import AddGodownModal from '../../utils/modals/addGodownModal.js';
import DeleteModal from '../../utils/modals/deleteModal.js'
import RenameModal from '../../utils/modals/renameModal.js';  
import PlusIcon from '../../utils/PlusIcon.js';


const Sidebar = ({ setCurrentGodown }) => {
  const [locations, setLocations] = useState([]);
  const [expandedLocations, setExpandedLocations] = useState({});
  const [sublocations, setSublocations] = useState({});
  const [expandedSublocations, setExpandedSublocations] = useState({});
  const [godowns, setGodowns] = useState({});
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [isAddSublocationModalOpen, setIsAddSublocationModalOpen] = useState(false);
  const [isAddGodownModalOpen, setIsAddGodownModalOpen] = useState(false);
  const [newSublocationParentId, setNewSublocationParentId] = useState('');
  const [newGodownParentId, setNewGodownParentId] = useState('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [renameId, setRenameId] = useState('');
  const[deleteId, setDeleteId] = useState('');


  const fetchLocations = async () => {
    setLoading(true);
    const locationData = await getParentGodowns();
    setLocations(locationData || []);
    setLoading(false);
  };
  //Fetch Parent Locations
  useEffect(() => {
    
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

  // Toggle expand/collapse of locations and sublocations
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
          <MenuItem onClick={() => { setIsRenameModalOpen(true); setRenameId(godown._id)}} className="context-menu-item">Rename</MenuItem>
          <MenuItem onClick={() => { setIsDeleteModalOpen(true);setDeleteId(godown._id)}} className="context-menu-item">Delete</MenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
    );
  };

  const handleAddLocation =  async (location) => {
    setLoading(true);
    await addGodown({ name: location });
    setLoading(false);
    fetchLocations();
  };
  const handleAddSublocation = async (sublocation) => {
    // console.log("Sublocation entered:", sublocation);
    // console.log("Parent ID:", newSublocationParentId);
    setLoading(true);
    await addGodown({ name: sublocation, parent_godown: newSublocationParentId });
    setLoading(false);
    collapseAll();
    setNewSublocationParentId('');
  }
  const handleAddGodown = async (godown) => {
    // console.log("Godown entered:", godown);
    // console.log("Parent ID:", newGodownParentId);
    setLoading(true);
    await addGodown({ name: godown, parent_godown: newGodownParentId });
    setLoading(false);
    collapseAll();
    setNewGodownParentId('');
  }
  const handleRename = async(name) => {  
    console.log("nameId:", renameId);
    console.log("Name entered:", name);
    setLoading(true);
    await renameGodown(renameId, name);
    fetchLocations();
    collapseAll();
    setLoading(false);    
    setRenameId('');
  }
  const handleDelete = async() => {
    console.log("DeleteId:", deleteId);
    console.log("Delete clicked"); 
    setLoading(true);
    await deleteGodown(deleteId);
    fetchLocations();
    setLoading(false);
    collapseAll()
    setDeleteId('');;
  }

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
        <div className="flex items-center justify-between">
          <h2>Inventory Locations</h2>
          <PlusIcon onClick={() => setIsModalOpen(true)} />
        </div>
        <button onClick={collapseAll} className="collapse-all-btn">Collapse All</button>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <ul>
            {locations.map(location => (
              <li key={location._id}>
                <ContextMenuTrigger id={`location_${location._id}`}>
                  <div
                    onClick={() => {toggleExpand('location', location._id);} }
                    className="location-item"
                    aria-expanded={expandedLocations[location._id]}
                  >
                    {expandedLocations[location._id] ? '▼' : '➤'}<span>{location.name}</span>
                  </div>
                </ContextMenuTrigger>
                <ContextMenu id={`location_${location._id}`} className="context-menu">
                  <MenuItem onClick={() => {setIsAddSublocationModalOpen(true) ;setNewSublocationParentId(location._id)}} className="context-menu-item">Add Sublocation</MenuItem>
                  <MenuItem onClick={() => {setIsRenameModalOpen(true); setRenameId(location._id)}} className="context-menu-item">Rename</MenuItem>
                  <MenuItem onClick={() => {setIsDeleteModalOpen(true);setDeleteId(location._id)}} className="context-menu-item">Delete</MenuItem>
                </ContextMenu>
                {expandedLocations[location._id] && (
                  <ul className="expanded">
                    {(sublocations[location._id] || []).map(sublocation => (
                      <li key={sublocation._id}>
                        <ContextMenuTrigger id={`sublocation_${sublocation._id}`}>
                          <div
                            onClick={() => {toggleExpand('sublocation', sublocation._id);setCurrentGodown(sublocation);}}
                            className="sublocation-item"
                            aria-expanded={expandedSublocations[sublocation._id]}
                          >
                            {expandedSublocations[sublocation._id] ? '▼' : '➤'}<span>{sublocation.name}</span>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenu id={`sublocation_${sublocation._id}`} className="context-menu">
                          <MenuItem onClick={() => {setIsAddGodownModalOpen(true); setNewGodownParentId(sublocation._id)}} className="context-menu-item">Add Godown</MenuItem>
                          <MenuItem onClick={() =>{setIsRenameModalOpen(true); setRenameId(sublocation._id)} } className="context-menu-item">Rename</MenuItem>
                          <MenuItem onClick={() => {setIsDeleteModalOpen(true);setDeleteId(sublocation._id)}} className="context-menu-item">Delete</MenuItem>
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
      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLocation}
      />
      <AddSublocationModal
        isOpen={isAddSublocationModalOpen}
        onClose={() => setIsAddSublocationModalOpen(false)}
        onSubmit={handleAddSublocation}
      />
      <AddGodownModal
        isOpen={isAddGodownModalOpen}
        onClose={() => setIsAddGodownModalOpen(false)}
        onSubmit={handleAddGodown}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <RenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSubmit={handleRename}
      />
    </div>
  );
};

export default Sidebar;