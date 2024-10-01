import React, { useEffect, useMemo, useState } from 'react';
import { Center, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useTable } from "react-table";

const url = "https://fakestoreapi.com/products";

const tableColumn = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Product Image",
    accessor: "image",
  },
  {
    Header: "Price",
    accessor: "price",
  },
];

const App = () => {
  const [products, setProducts] = useState([]);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => products, [products]);
  
  // Destructure rows instead of row
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <>
      <Heading>React Table Sample</Heading>

      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default App;
