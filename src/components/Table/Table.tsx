import React, { memo, FC } from 'react';
import styled from 'styled-components';
import { Error } from '../Error';
import { useMemo } from 'react';

type ColDef = {
  field: string;
  headerName: string;
};

interface TableProps {
  colDefs: ColDef[];
  data?: Record<string, string>[];
}

const TableStle = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 0.7em 1em;
    border: 1px solid ${(p) => p.theme.colors.border};
  }

  th {
    color: white;
    background-color: ${(p) => p.theme.colors.tableHeader};
  }

  tr {
    background-color: white;
  }

  tbody tr:nth-child(even) {
    background-color: ${(p) => p.theme.colors.tableRowEven};
  }
`;

const NoDataRow = styled.tr`
  td {
    text-align: center;
  }
`;

export const Table: FC<TableProps> = memo(({ colDefs, data }) => {
  const noData = useMemo(() => !data || data.length === 0, [data]);

  if (!colDefs || colDefs.length === 0)
    return <Error message="Component Render Error" />;

  return (
    <TableStle>
      <thead>
        <tr>
          {colDefs.map((item) => (
            <th key={item.field}>{item.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {noData ? (
          <NoDataRow>
            <td colSpan={colDefs.length}>No data</td>
          </NoDataRow>
        ) : (
          data?.map((rowData, idx) => (
            <tr key={idx}>
              {colDefs.map((h) => (
                <td key={rowData[h.field]}>{rowData[h.field]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </TableStle>
  );
});

Table.defaultProps = {};
