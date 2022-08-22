import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBanner } from "../features/banners/bannersSlice";
import ReviewBanner from "./media/card";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

function BannersList() {
  const banners = useSelector((state) => state.banners);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBanner(id));
  };
  const handleEdit = (id) => {
    navigate(`/edit-banner/${id}`)
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Typography>Banners ({banners.length})</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" href="/create-banner">
          Crear nuevo banner
        </Button>
      </Grid>{banners.map((banner) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={banner.id} >
          <ReviewBanner cardInfo={banner} handleDelete={handleDelete} handleEdit={handleEdit} />
        </Grid>))}
    </Grid>





  );
}

export default BannersList;