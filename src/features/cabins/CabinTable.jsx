import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' empty='No cabins found'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {/* Render Props Pattern */}
      <Table.Body data={cabins} render={cabin => <CabinRow key={cabin.id} cabin={cabin} />} />
    </Table>
  );
}

export default CabinTable;
