import { Button, ButtonGroup, Card, CardMedia, Grid, ListItemButton, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AreaApi, AreaOut, PlantApi, PlantOut } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Helmet } from 'react-helmet-async';

const PlantDetail = () => {
  const { id } = useParams();
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<AreaOut>();
  const [plantData, setPlantData] = useState<PlantOut>();

  // get plant details and then area details
  useEffect(() => {
    const fetchData = async () => {
      console.log('start');
      setLoading(true);
      try {
        const response = await api.trackerApiViewPlantGetPlant(id!);
        if (response.status === 200) {
          console.log('In');
          setPlantData(response.data);
          const locResponse = await areaApi.trackerApiViewAreaGetArea(response.data.area_id!);
          if (locResponse.status === 200) {
            setAreaData(locResponse.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  // start reference menu item

  const anchorRef = React.useRef<HTMLDivElement>(null);

  // end reference menu item

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | ' + plantData?.name}</title>
      </Helmet>
      <Typography variant="h4" align="center">
        {plantData?.name}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="stretch" columns={{ xs: 2, sm: 3, md: 2 }}>
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Common Name:</Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.common_name}
          </Typography>
          <Typography variant="button">Scientific Name: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.scientific_name}
          </Typography>
          <Typography variant="button">Area: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {areaData?.name}
          </Typography>
          <Typography variant="button">Purchase Date: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.purchase_date}
          </Typography>
          {plantData?.death_date ? (
            <>
              <Typography variant="button">Death Date: </Typography>
              <Typography variant="body1" marginLeft={2}>
                {plantData?.death_date}
              </Typography>
            </>
          ) : null}
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button
              onClick={() => {
                navigate(`/editPlant/${plantData?.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                navigate(`/newEntry/${plantData?.id}`);
              }}
            >
              Add Activity Entry
            </Button>
            <Button
              onClick={() => {
                api.trackerApiViewPlantPatchPlant(plantData?.id!, { ...plantData, graveyard: true });
                navigate(`/myPlants}`);
              }}
            >
              Send to Graveyard
            </Button>
            <Button
              onClick={() => {
                api.trackerApiViewPlantDeletePlant(plantData?.id!);
                navigate(`/myPlants}`);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item marginRight={2}>
          <Card sx={{ maxWidth: 150 }}>
            <CardMedia
              component={'img'}
              src={`${import.meta.env.VITE_BACKEND_URL}/${plantData?.main_photo}`}
              sx={{ height: 240 }}
            />
          </Card>
        </Grid>
      </Grid>

      {plantData && plantData.entries && plantData.entries.length > 0 ? (
        <>
          <Typography variant="h6" marginLeft={2}>
            Activity Entries
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {plantData.entries.map((e) => (
              <ListItem key={e.id}>
                <ListItemButton component="a" href={'/entry/' + e.id}>
                  <ListItemText primary={e.activities.map((a) => a.name).join(', ')} secondary={e.timestamp} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </>
  );
};

export default PlantDetail;
