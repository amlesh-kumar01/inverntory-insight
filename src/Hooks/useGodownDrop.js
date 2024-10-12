import { useDrop } from 'react-dnd';

const useGodownDrop = (godown, handleDrop) => {
  return useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => handleDrop(item, godown),
  }), [godown]);
};

export default useGodownDrop;
