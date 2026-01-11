import { Table } from '@mantine/core';

const elements = [
  { included: 6, exterior: 12.011 },
  { included: 7, exterior: 14.007 },
  { included: 39, exterior: 88.906 },
  { included: 56, exterior: 137.33 },
  { included: 58, exterior: 140.12 },
];

export const ExteriorTable = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.idx}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.exterior}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Included?</Table.Th>
        <Table.Th>Exterior</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{rows}</Table.Tbody>
  </Table>
  )
}