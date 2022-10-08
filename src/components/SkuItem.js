import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import skuImage from "../mock/assets/chilmil.jpg";

const SkuImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
  });


SkuItem.propTypes = {
  data: PropTypes.object,
};

export default function SkuItem({data}) {

  return (
        <Grid container spacing={1}>
            <Grid item xs={4} md={4} lg={4}>
                    <SkuImgStyle alt={"test"} src={skuImage} />
            </Grid>
            <Grid item xs={8} md={8} lg={8}>
                     <Typography variant="body1">
                        {data.name}
                     </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={8} md={8} lg={8}>
                        <Typography variant="caption">
                            Rp {data.price}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <Typography variant="caption">
                            {data.sold} unit
                        </Typography>
                      </Grid>
                     </Grid>
                    
            </Grid>
        </Grid>
  );
}