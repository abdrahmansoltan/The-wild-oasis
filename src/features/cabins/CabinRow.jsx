import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    const cabinToDuplicate = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image
    };
    createCabin(cabinToDuplicate);
  }

  return (
    <Table.Row role='row'>
      <img src={image} />
      <Cabin role='cell'>{name}</Cabin>
      <div role='cell'>Fits up to {maxCapacity} guests</div>
      <Price role='cell'>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount role='cell'>{discount}</Discount> : <span role='cell'>&mdash;</span>}

      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          {/* Edit cabin */}
          <Modal.Open opens='edit-cabin'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='edit-cabin'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          {/* Delete cabin */}
          <Modal.Open opens='delete-cabin'>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name='delete-cabin'>
            <ConfirmDelete
              resource='cabin'
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
