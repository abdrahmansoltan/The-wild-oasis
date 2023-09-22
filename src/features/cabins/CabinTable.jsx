import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // Handle filter by discount FE-side
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);

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
      <Table.Body
        data={filteredCabins}
        render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
