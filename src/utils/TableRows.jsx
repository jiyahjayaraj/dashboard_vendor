import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Box,
  Typography,
  useTheme
} from '@mui/material';

import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import CommentIcon from '@mui/icons-material/Comment';

import NoDataMsg from './NodataMsg';
import styles from './style';

const TableRows = ({
  data = [],
  keys = [],
  config = {},
  currentPage = 1,
  tableLimit = 10,
  handleViewModel,
  handleFormModal,
  handleDeleteModal,
  hasDelete = true,
  hasEdit = true,
  hasComment = true,
  hasView = true,
  hasActionRow = true,
  slNo = true,
  hideArray = [],
  msg,
  tableData,
  filter,
  modal = ''
}) => {

  const theme = useTheme();
  const style = styles(theme);

  console.log("Table Data FULL =", data);

  /* =========================
     Cell Content Formatter
  ========================= */

  const cellContent = (keyItem, row) => {

    // Rating Fix
    if (keyItem === "rating") {
      return row.rating || 0;
    }

    // Date Fix
    if (keyItem === "createdAt" && row.createdAt) {
      return new Date(row.createdAt).toLocaleDateString('en-GB');
    }

    return row[keyItem] ?? "-";
  };


  /* =========================
     Column Count
  ========================= */

  const visibleColumnCount = React.useMemo(() => {

    let count = 0;

    if (slNo) count++;

    keys.forEach((keyItem) => {
      if (config[keyItem] && !hideArray.includes(config[keyItem].label)) {
        count++;
      }
    });

    if (hasActionRow) count++;

    return count;

  }, [slNo, keys, config, hideArray, hasActionRow]);


  /* =========================
     Render
  ========================= */

  return (
    <TableBody>

      {data?.length > 0 ? (

        data.map((row, i) => (

          <TableRow key={i}>

            {/* SL NO FIX */}
            {slNo && (
              <TableCell>
                {i + 1}
              </TableCell>
            )}

            {/* DATA COLUMNS */}
            {keys.map((keyItem, index) => {

              if (!config[keyItem] ||
                hideArray.includes(config[keyItem].label)) {
                return null;
              }

              return (

                <TableCell key={index}>
                  <Tooltip title={String(cellContent(keyItem, row))}>
                    <Typography>

                      {cellContent(keyItem, row)}

                    </Typography>

                  </Tooltip>

                </TableCell>

              );

            })}

            {/* ACTION COLUMN */}

            {hasActionRow && (

              <TableCell>

                <Box sx={{ display: 'flex', gap: 1 }}>

                  {hasComment && (
                    <Tooltip title="Reply">
                      <IconButton
                        onClick={() =>
                          handleFormModal &&
                          handleFormModal(row)
                        }
                      >
                        <CommentIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {hasDelete && (
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          console.log("ROW CLICKED =", row);
                          handleDeleteModal && handleDeleteModal(row);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                </Box>

              </TableCell>

            )}

          </TableRow>

        ))

      ) : (

        <TableRow>

          <TableCell colSpan={visibleColumnCount} align="center">

            <NoDataMsg
              msg={msg}
              tableData={tableData}
              filter={filter}
            />

          </TableCell>

        </TableRow>

      )}

    </TableBody>
  );
};

export default TableRows;