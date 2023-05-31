import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Grid, Table, Text, ScrollArea, createStyles } from "@mantine/core";
import { btnStyle } from "../utils/linkStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRendezvous,
  getRendezvous,
} from "../redux/services/rendezvousService";
import AddRendezvous from "./AddRendezvous";
import ModalConfirm from "./ModalConfirm";
import { openConfirmModal } from "@mantine/modals";
import { toast } from "react-hot-toast";
// import { DateInput, DatePickerInput } from '@mantine/dates'
// import 'dayjs/locale/de';
import Demo from "./TestDate";
import { DateInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  Table: {
    // width: "100%",
    [`@media (max-width: ${theme.breakpoints.xs})`]: {
      width: 600,
    },
  },
}));

export default function RendezVous() {
  const { classes } = useStyles();
  const [openedModal, setOpenedModal] = useState(false);
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("");
  const [ouvre, setOuvre] = useState(false);
  const dispatch = useDispatch();
  const [rendezvous, setRendezvous] = useState({
    nomComplet: "",
    dateRendezvous: "",
    description: "",
  });
  const [error, setError] = useState("");
  const stateRendezvous = useSelector((state) => state.rendezvous);
  // console.log(stateRendezvous)

  useEffect(() => {
    dispatch(getRendezvous());
  }, [dispatch]);
  const openDeleteModal = (rdv) =>
    openConfirmModal({
      title: "Supprimer le rendez-vous",
      centered: true,
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer ce rendez-vous ?
        </Text>
      ),
      labels: { confirm: "supprimer", cancel: "Annuler" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        dispatch(deleteRendezvous(rdv._id))
          .then(() => {
            toast("Rendez-vous Supprimé  avec success", { icon: "👏" });
          })
          .catch((error) => {
            console.log(error);
            toast("Error");
          });
      },
    });
  //if you want to avoid useEffect, look at the React Query example instead

  // <Grid style={{ padding: "5px" , justifyContent : 'center' , alignItems : 'center' }}>
  //                     <Grid.Col span={4}>
  //                       <AiOutlineEdit
  //                         onClick={() => {
  //                           setOpenedModal((open) => !open);
  //                           setMode("update");
  //                           setRendezvous(rv);
  //                         }}
  //                       />
  //                     </Grid.Col>
  //                     <Grid.Col span={4}>
  //                       <AiOutlineDelete
  //                         onClick={() => {
  //                           setOuvre((open) => !open);
  //                           setId(rv._id);
  //                         }}
  //                       />
  //                     </Grid.Col>
  //                   </Grid>

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!data.length) {
  //       setIsLoading(true);
  //     } else {
  //       setIsRefetching(true);
  //     }

  //     const url = new URL(

  //       '/api/rendezvous',
  //       process.env.NODE_ENV === 'production'

  //         ? 'https://www.mantine-react-table.com'

  //         : 'http://localhost:5550',

  //     );

  //     url.searchParams.set(
  //       'start',
  //       `${pagination.pageIndex * pagination.pageSize}`,
  //     );
  //     console.log(pagination.pageIndex)
  //     console.log(pagination.pageSize)

  //     url.searchParams.set('size', `${pagination.pageSize}`);
  //     url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
  //     url.searchParams.set('globalFilter', globalFilter ?? '');
  //     url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

  //     try {
  //       const response = await fetch(url.href);
  //       const json = await response.json();
  //       setData(json.data);
  //       // console.log(json)
  //       setRowCount(json.data.length);
  //       // setRowCount(json.meta.totalRowCount);
  //     }
  //     catch (error) {
  //       setIsError(true);
  //       console.error(error);
  //       return;

  //     }
  //     setIsError(false);
  //     setIsLoading(false);
  //     setIsRefetching(false);

  //   };

  //   fetchData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps

  // }, [
  //   columnFilters,
  //   globalFilter,
  //    pagination.pageIndex,
  //    pagination.pageSize,
  //    sorting,]);
  // const columns = useMemo(() => [

  //     {
  //       accessorKey: 'nomCompletPatient',
  //       header: 'Nom complet',
  //     },

  //     {
  //       accessorKey: 'dateRendezvous',
  //       header: 'Date Rendez-vous',
  //     },
  //     {
  //       accessorKey: 'description',
  //       header: 'Exisences',
  //     },
  //     {
  //       // accessorKey: 'description',
  //       header: 'action',

  //     }

  //      ],

  //   [],);

  return (
    <div className="table-container">
      {/* <DateInput /> */}
      <h1>Rendez vous</h1>
      <Grid justify="flex-end">
        <button
          onClick={() => {
            setOpenedModal((open) => !open);
            setRendezvous({
              nomCompletPatient: "",
              dateRendezvous: "",
              description: "",
            });
            setError("");
          }}
          style={btnStyle}
        >
          Programmer un Rendez vous
        </button>
      </Grid>
      {openedModal && mode === "update" ? (
        <AddRendezvous
          setOpened={setOpenedModal}
          opened={openedModal}
          title="Modifier un Rendez vous"
          rendezvous={rendezvous}
          setRendezvous={setRendezvous}
          setError={setError}
          error={error}
        />
      ) : (
        <AddRendezvous
          setOpened={setOpenedModal}
          opened={openedModal}
          title="Ajouter un Rendez vous"
          rendezvous={rendezvous}
          setRendezvous={setRendezvous}
          setError={setError}
          error={error}
        />
      )}

      <div>
      
        <ScrollArea>
          <Table className={classes.Table}>
            <thead>
              <tr>
                <th>Nom complet </th>
                <th>Date Rendez-vous</th>
                <th>Exisences</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stateRendezvous?.data.map((rv) => (
                <tr key={rv._id}>
                  <td>{rv.nomCompletPatient}</td>
                  <td>{rv.dateRendezvous}</td>
                  <td>{rv.description}</td>
                  <td>
                    <AiOutlineEdit
                      onClick={() => {
                        setOpenedModal((open) => !open);
                        setMode("update");
                        setRendezvous(rv);
                      }}
                    />
                    <AiOutlineDelete
                      onClick={() => {
                        openDeleteModal(rv);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
        {ouvre && (
          <ModalConfirm
            setOuvre={setOuvre}
            ouvre={ouvre}
            title={"Confirmer la suppréssion"}
            contenu={"Vous vous supprimer ce Rendez vous."}
            rendezvous={"rendezvous"}
            // handleDelete={handleDelete}
            id={id}
          />
        )}
      </div>
      {/* <MantineReactTable
        columns={columns}
        data = {
          data
          
        }
        enableRowSelection
        getRowId={(row) => row.phoneNumber}
        initialState={{ showColumnFilters: true }}
        autoResetPageIndex = {false}
     
        manualFiltering
        // paginateExpandedRows
        // manualPagination
        manualSorting
        icons={'fontAwesomeIcons'}
        mantineToolbarAlertBannerProps={
          isError
          ? {
        color: 'red',
        children: 'Error loading data',
      }: undefined}
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      rowCount={rowCount}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isRefetching,
        sorting,
      }}

/> */}
    </div>
  );
}
