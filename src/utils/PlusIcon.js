const PlusIcon = ({ onClick }) => (
  <button onClick={onClick} title="Add Location" className="text-blue-500 hover:text-blue-700 transform md:translate-x-0 translate-x-[-100px]">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  </button>
);

export default PlusIcon;
