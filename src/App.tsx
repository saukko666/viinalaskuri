import React, { useReducer, useMemo, useEffect } from "react";
import { Paper, Typography, Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Form } from "./Form";

export const useStyles = makeStyles((theme: Theme) =>
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
  var initialState: FormData = {
    item: "",
    qty: "",
    price: "",
    subtotal: "",
  };

  // https://medium.com/javascript-in-plain-english/react-controlled-forms-with-hooks-538762aab935
  const reducer = (
    state: FormData,
    { field, value }: { [x: string]: string | number }
  ) => {
    return {
      ...state,
      [field]: value,
    };
  };
  const [form, dispatch] = useReducer(reducer, initialState);

  const subtotal = useMemo(
    () => (Number(form.qty) * Number(form.price)).toFixed(2),
    [form]
  );
  useEffect(() => dispatch({ field: "subtotal", value: subtotal }), [subtotal]);

  const resetFields = () => {
    for (let i = 0; i < Object.keys(form).length; i++) {
      dispatch({
        field: Object.keys(form)[i],
        value: "",
      });
    }
  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };
  const handleForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let target = evt.currentTarget;
    let field = target.name;

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

  // const { item, qty, price } = form;
  const props = { form, handleSubmit, handleForm, resetFields };
  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4">
          Viinalaskuri
        </Typography>

        <Form {...props} />

        <Paper className={classes.paper}>
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </Paper>
      </Paper>
    </Container>
  );
}

export default App;
