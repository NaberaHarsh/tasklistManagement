import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./jokes.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container, Paper, Grid } from "@material-ui/core";
import CircularIndeterminate from "./progressBar";

const Jokes = () => {
  const [jokesData, setJokesData] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setupData();
  }, []);

  const setupData = async () => {
    setShowLoader(true);
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/jokes/ten"
      );
      setJokesData(response.data);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };
  return (
    <Fragment>
      <h1 className="heading">Jokes</h1>

      <Container maxWidth="lg">
        <Paper className="block">
          <Grid container spacing={4}>
            {jokesData && jokesData.length > 0 ? (
              jokesData.map((ele: any) => (
                <Grid xl={6} lg={6} md={6} sm={12} xs={12} item key={ele.id}>
                  <Card className="card">
                    <CardContent className="card">
                      <h3 className="setup">{ele.setup}</h3>
                      <p className="punchline">{ele.punchline}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid xl={12} lg={12} md={12} sm={12} xs={12} item>
                <Card className="card">
                  <CardContent className="card">
                    <h3 className="setup">No Jokes Available</h3>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>

      {/* progress bar */}
      <CircularIndeterminate showLoader={showLoader} />
    </Fragment>
  );
};

export default Jokes;
