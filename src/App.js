import './App.css';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Container } from '@mui/material';


function App() {
  const [data, setData] = useState()
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch("https://big-kitchen-petite.functions.dev.on-fleek.app/invoke?query=iphone");
      return response;
    }
    fetchData().then(res => res.json()).then(r => setData(r))
  }, [])
  return (
    <>
    <Container fluid>
    <Typography margin={10} variant="h3" align="center">Welcome to my news site</Typography>
    <Container fluid>
      <Grid container spacing={2}>
        {data && data.news.articles.map((dataObj, index) => {
          return (
            <Grid item><Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={dataObj.urlToImage}
                  alt="news"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dataObj.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dataObj.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button href={dataObj.url} size="small" color="primary">
                  VIEW
                </Button>
              </CardActions>
            </Card></Grid>
          );
        })}</Grid></Container></Container></>
  );
}

export default App;
