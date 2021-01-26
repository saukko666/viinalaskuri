import React, { useReducer } from "react";
import {
  Paper,
  Button,
  Typography,
  TextField,
  Container,
  Input,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
  })
);

function App() {
  const classes = useStyles();
  type FormData = {
    item: string;
    qty: number | string;
    price: number | string;
    subtotal: string;
  };
  var formData: FormData = {
    item: "",
    qty: "",
    price: "",
    subtotal: "",
  };

  // thanks to https://medium.com/javascript-in-plain-english/react-controlled-forms-with-hooks-538762aab935
  const reducer = (
    state: FormData,
    { field, value }: { [x: string]: string | number }
  ) => {
    return {
      ...state,
      [field]: value,
    };
  };
  const [form, dispatch] = useReducer(reducer, formData);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };
  const handleForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let target = evt.currentTarget;
    let field = target.id;

    /**
     *  Needs more checks but this should be enough for now.
     */
    if (field in form) {
      if (target.type === "number" && !!!isNaN(target.valueAsNumber)) {
        dispatch({
          field: field,
          value: target.valueAsNumber,
        });
      } else {
        dispatch({
          field: field,
          value: target.value,
        });
      }
    }
  };

  const { item, qty, price } = form;
  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4">
          Viinalaskuri
        </Typography>

        <form action="#" method="GET" onSubmit={handleSubmit}>
          <Paper className={classes.paper} style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                placeholder="Item name"
                id="item"
                value={item}
                onChange={handleForm}
              ></TextField>
              <TextField
                placeholder="Quantity"
                id="qty"
                value={qty}
                type="number"
                onChange={handleForm}
              ></TextField>
              <TextField
                placeholder="Price per quantity"
                id="price"
                value={price}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={handleForm}
              ></TextField>
              <Input
                placeholder="Subtotal"
                readOnly
                id="subtotal"
                value={(Number(qty) * Number(price)).toFixed(2)}
                type="text"
              ></Input>
            </div>
          </Paper>
          <br />
          <Button disabled type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>

        <Paper className={classes.paper}>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </Paper>
      </Paper>
    </Container>
  );
}

export default App;
